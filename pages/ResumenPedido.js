import React, { useState, useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import ModalSelector from 'react-native-modal-selector'

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoArticulo from "../components/InfoArticulo";
import Btn01 from "../components/Btn01";
import { useNavigation, CommonActions, useFocusEffect } from "@react-navigation/native";
import { Directions, TouchableOpacity } from "react-native-gesture-handler";
import { DatosDeFacturacion } from "../components/DatosDeFctruracion";
import { ButtonGroup } from "../components/ButtonGroup";
import ModalDireccionesEnvio from "../components/ModalDireccionesEnvio";
import { API_URL } from "../config";
import ModalCrearDireccionDeEnvio from "../components/ModalCrearDireccionDeEnvio";
import { color } from "react-native-reanimated";

export default ResumenPedido = ({ route, navigation }) => {
    const [carrito, setCarrito] = useState([]);
    const [totalArticulos, setTotalArticulos] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [direccion, setDireccion] = useState('');

    const [modalViewDireccion, setModalViewDireccion] = useState(false);
    const [metodoPago, setMetodoPago] = useState('tarjeta');

    const [okeyDireccion, setOkeyDireccion] = useState(false);
    const [okeyDatosFactura, setOkeyDatosFactura] = useState(true);

    const [error, setError] = useState(false);

    const [crearDireccionView, setCrearDireccionView] = useState(false)

    const { user } = useAuthContext();
    const local = route.params.local;
    const tipoPedido = route.params.pedido;
    const uidEstadoPedido = "OSTATE5B6F6B756EC682.47106884";
    console.log("LOCAL" + JSON.stringify(local))

    const crearPedido = async () => {
        let errorPedido = false;
        if (!user) {
            console.log("NOT LOGING")
            return Alert.alert(
                "Iniciar Sesión",
                "Para poder seguir y realizar el pago deberá inciar sesión.",
                [
                    // The "Yes" button
                    {
                        text: "Iniciar Sesión",
                        onPress: () => {
                            navigation.navigate("Login")
                        },
                    },
                    {
                        text: "Cerrar",
                    },
                ]
            );
        } else {
            setIsLoading(true)
            const crearPedidoTabla = async () => {

                const response = await fetch(`${API_URL}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },

                    body: JSON.stringify({
                        "uidLocalEntrega": local.uid,
                        uidEstadoPedido,
                        metodoPago,
                        "importe": total,
                        "enabled": 0
                    })
                })
                const json = await response.json()
                if (!response.ok) {
                    console.log(json.error)
                    errorPedido = true
                }
                if (response.ok) {
                    errorPedido = false
                    //console.log(json.order_uid)
                    const finalUid = json.order_uid;
                    return finalUid
                }

            }
            const asignarArticulos = async (order_uid) => {

                const article_ids = carrito.map(article => article.id);
                console.log("arriculos ids: " + article_ids)
                const response = await fetch(`${API_URL}/order/setArticle`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({ article_ids, order_uid })
                })
                const json = await response.json()
                if (!response.ok) {
                    console.log(json.error)
                    errorPedido = true
                }
                if (response.ok) {
                    console.log("okey")
                    errorPedido = false
                }
            }
            if (tipoPedido === "Envio") {
                const guardarDatosEnvio = async (order_uid) => {

                    const response = await fetch(`${API_URL}/order/setDatosEnvio`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },

                        body: JSON.stringify({ order_uid, ...direccion })
                    })
                    const json = await response.json()
                    if (!response.ok) {
                        console.log(json.error)
                        errorPedido = true
                    }
                    if (response.ok) {
                        console.log(json)
                        errorPedido = false
                    }
                }
                guardarDatosEnvio();
            }

            const crearFactura = async (order_uid) => {

                const response = await fetch(`${API_URL}/order/factura`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },

                    body: JSON.stringify({ order_uid })
                })
                const json = await response.json()
                if (!response.ok) {
                    console.log("FACTURA  " + JSON.stringify(json.error))
                    errorPedido = true
                }
                if (response.ok) {
                    console.log("FACTURA" + JSON.stringify(json))
                    errorPedido = false
                }
            }

            //crear pedido tabla
            const order_uid = await crearPedidoTabla();

            //asignar articulos a pedido,(order_id,[article_Id,article_Id])
            if (errorPedido !== true) {
                await asignarArticulos(order_uid);
            }
            if (errorPedido !== true) {
                //gurdar datos de envio si en a domicio
                if (tipoPedido === "Envio") {
                    const guardarDatosEnvio = async (order_uid) => {

                        const response = await fetch(`${API_URL}/order/setDatosEnvio`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`
                            },

                            body: JSON.stringify({ order_uid, ...direccion })
                        })
                        const json = await response.json()
                        if (!response.ok) {
                            console.log(json.error)
                            errorPedido = true
                        }
                        if (response.ok) {
                            console.log(json)
                            errorPedido = false
                        }
                    }
                    await guardarDatosEnvio(order_uid);
                }
            }
            if (errorPedido !== true) {
                //crear order bill FACTURA
                await crearFactura(order_uid);
                setIsLoading(false)


            }


            if (errorPedido === true) {
                console.log("SOME ERRRO HAPPEN")
                setIsLoading(false)
                return Alert.alert(
                    "Error",
                    "Algo ha ido mal",
                    [
                        {
                            text: "Cerrar",
                        },
                    ]
                );
            } else {
                setIsLoading(false)
                navigation.navigate("PaginaDePago", { "order_uid": order_uid, "amount": total, "metodoDePago": metodoPago })
            }
        }

    }

    const calTotal = (e) => {
        var totalPrice = 0;
        e.forEach(function (item) {
            totalPrice += parseFloat(item.price);
        });
        setTotalArticulos(totalPrice.toFixed(2))

        if (tipoPedido === "Envio") {
            const totalFinal = parseFloat(totalPrice.toFixed(2)) + 3.95;
            setTotal(totalFinal.toFixed(2));
        } else {
            const totalFinal = totalPrice.toFixed(2);
            setTotal(totalFinal);
        }
    }


    useEffect(() => {
        const getData2 = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@carrito');
                // console.log("useeffect" + jsonValue);
                setCarrito(JSON.parse(jsonValue));
                calTotal(JSON.parse(jsonValue));


            } catch (e) {
                // error reading value
            }
        }
        getData2();


        const checkContinuar = async () => {
            /*  if (!direccion) {
                  setOkeyContinuar(false)
                  console.log("sin datos de direccion")
              }*/
            const jsonValue = JSON.parse(await AsyncStorage.getItem('@DireccionesDeEnvio'));
            console.log("DAOS ENVIO  " + JSON.stringify(jsonValue));
            if (jsonValue && jsonValue != '' && jsonValue != [] || tipoPedido !== "Envio") {
                setOkeyDireccion(true)
            }
            else { setOkeyDireccion(false) }

        }
        checkContinuar();

        const unsubscribe = navigation.addListener('focus', () => {
            // Perform some actions when the component mounts or becomes focused
            // For example, refetch data from an API
            getData2();
            checkContinuar();

          });
      
          // Return a cleanup function to remove the listener when the component unmounts
        return unsubscribe;



    }, [navigation]);

    const navigateCustom = async (page) => {
        /*await navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Compra' },
                ],
            })
        );*/

        navigation.push(page)
    }

    const alertDeError = () => {
        console.log("ERROR WHEN CONTINUAR")
        return Alert.alert(
            "Error",
            "Introduce toda la información necesaria para poder seguir",
            [{ text: "Cerrar" }]
        );

    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.defautlCtn}>
                <ActivityIndicator size="large" color="#464644" />
            </SafeAreaView>
        )

    } else {
        return (
            <SafeAreaView style={styles.mainCtn}>

                <ScrollView>

                    <View style={styles.topCtn}>
                        <Text style={styles.titulo}>RESUMEN</Text>

                        <View style={styles.ctnPrecios}>
                            <Text style={styles.textPrecios}>Forma de entrega</Text>
                            <Text style={styles.textPrecios}>{tipoPedido}</Text>
                        </View>
                        <View style={styles.ctnPrecios}>
                            <Text style={styles.textPrecios}>Productos de impresión</Text>
                            <Text style={styles.textPrecios} >{carrito ? carrito.length : 0} Artículos</Text>
                        </View>

                        <Text style={styles.textPrecios}>Forma De pago</Text>
                        <View style={styles.containerOpcion}>
                            <ButtonGroup
                                default={0}
                                buttons={["TARJETA", "BIZUM"]}
                                onChange={value => setMetodoPago(value)}
                            />
                        </View>

                        {user ?
                            <>
                                <ModalDireccionesEnvio
                                    visible={modalViewDireccion}
                                    onClose={() => setModalViewDireccion(false)}
                                    setDireccion={setDireccion}

                                />
                                <Text style={styles.h2Titulo}>Datos de envío </Text>
                                {tipoPedido === "Envio" ?
                                    direccion ?
                                        <>

                                            <View style={styles.ctnDireccion}>
                                                <View style={styles.ctnDireccionInfo}>
                                                    <Text style={styles.direccionText1}>{direccion.city}, {direccion.postal_code} {direccion.province}</Text>
                                                    <Text style={styles.direccionText2} numberOfLines={1} >{direccion.address}</Text>
                                                </View>

                                                <Btn01 title="Cambiar" onPress={() => setModalViewDireccion(true)} />
                                            </View>
                                        </>

                                        : <>

                                            <Btn01 title="Crear una direción de envío"
                                                onPress={() => navigateCustom("DireccionesDeEnvio2")

                                                } />

                                        </>

                                    : <>

                                        <View style={styles.ctnDireccion}>
                                            <View>
                                                <Text style={styles.textPrecios}>Entrega en local</Text>
                                                <Text style={{ color: "grey" }}>{local && local.descripcion}</Text>
                                                <Text style={{ color: "grey" }}>{local.address}</Text>
                                            </View>
                                        </View>
                                    </>
                                }
                                <Text style={styles.h2Titulo}>Datos de Facturación</Text>

                                <DatosDeFacturacion  setOkeyDatosFactura={setOkeyDatosFactura} user={user} />

                            </>
                            :
                            <>
                                <View style={styles.infoUsuario}>
                                    <Text style={styles.loginText}>Iniciar sesión para poder continuar</Text>
                                    <View style={styles.ctnLogin}>
                                        <Btn01 title="INICIAR SESIÓN" onPress={() => navigation.navigate('Login')} />
                                        <Btn01 title="CREAR CUENTA" onPress={() => navigation.navigate('Register')} />
                                    </View>
                                </View>
                            </>

                        }

                    </View>
                </ScrollView >
                <View style={styles.ctnBottom}>
                    <>
                        <View style={styles.ctnPrecios}>
                            <Text style={styles.textPrecios}>Artículos</Text>
                            <Text style={styles.textPrecios}>{totalArticulos} €</Text>
                        </View>

                        {tipoPedido === "Envio" ?
                            <View style={styles.ctnPrecios}>
                                <Text style={styles.textPrecios}>Gastos de envío</Text>
                                <Text style={styles.textPrecios}>3.95 €</Text>
                            </View> :
                            <View style={styles.ctnPrecios}>
                                <View>
                                    <Text style={styles.textPrecios}>Entrega en local</Text>

                                </View>

                                <Text style={styles.textPrecios}>- - -</Text>
                            </View>
                        }
                        <View style={styles.ctnTotal}>
                            <Text style={styles.textTotal}>Total</Text>
                            <Text style={styles.textTotal}>{total} €</Text>
                        </View>

                        <View style={styles.ctnBtnComprar}>
                            <TouchableOpacity
                                style={okeyDatosFactura && okeyDireccion
                                    ? styles.BtnComprar
                                    : styles.BtnComprarInactive}
                                onPress={okeyDatosFactura && okeyDireccion ? crearPedido : alertDeError}  >
                                <Text style={styles.appButtonText}>Continuar</Text>
                            </TouchableOpacity>

                        </View>
                    </>


                </View>

            </SafeAreaView >
        )
    }



}


const styles = StyleSheet.create({

    mainCtn: {
        flex: 1,
    },
    defautlCtn: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    ctnDireccionInfo: {
        flex: 1,
        paddingRight: 10,
    },

    btnCtn: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ctnBottom: {
        borderTopWidth: 1,
        borderColor: 'grey',
        padding: 20,
        backgroundColor: 'white',
    },
    textPrecios: {
        fontSize: 16,
        color: 'black',
    },
    ctnTotal: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctnPrecios: {
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctnBtnComprar: {
        marginTop: 20,
        alignItems: 'center',
    },
    BtnDisable: {
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 14,
        minWidth: '100%',
        backgroundColor: '#D9D9D9',

        alignContent: 'center',
        justifyContent: 'center',
    },
    BtnComprar: {
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 14,
        minWidth: '100%',
        backgroundColor: '#FDE619',

        alignContent: 'center',
        justifyContent: 'center',
    },
    BtnComprarInactive: {
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 14,
        minWidth: '100%',
        backgroundColor: 'grey',

        alignContent: 'center',
        justifyContent: 'center',
    },
    appButtonText: {
        textAlign: 'center',

        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    textTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    ctnDefault: {
        alignItems: 'center',
        padding: 20,
    },
    topCtn: {
        flex: 1,
        margin: 10,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 25,
        textAlign: 'center',
    },
    h2Titulo: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        marginTop: 15,
        marginBottom: 7,
    },
    containerOpcion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    infoUsuario: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 7,

    },
    loginText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',

        marginBottom: 15,
    },
    ctnLogin: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ctnDireccion: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 7,

    },
    direccionText1: {
        fontSize: 14,
        color: 'black',
    },
    direccionText2: {
        fontSize: 14,
        color: 'grey',
    }
});