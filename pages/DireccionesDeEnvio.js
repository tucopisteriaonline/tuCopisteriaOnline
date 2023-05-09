import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking, Modal, TextInput } from 'react-native'
import CloseIcon from '../Icons/CloseIcon'
import ButtonFinal from '../components/ButtonFinal'

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TopBackNavigation from '../components/TopBackNabigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalCrearDireccionDeEnvio from '../components/ModalCrearDireccionDeEnvio'

export const DireccionesDeEnvio = () => {
    const DatosFacturacionStack = createNativeStackNavigator();

    const DireccionesEnvio = () => {
        const [modalView, setModalView] = useState(false);
        const [modalData, setModalData] = useState(false);
        const [modalEditarView, setEditarView] = useState(false);
        const [data, setData] = useState(null);
        const [visible, setVisible] = useState(false);

        const [uid, setUid] = useState();
        const [nif, setNif] = useState();
        const [phone, setPhone] = useState();
        const [name, setName] = useState();
        const [surname, setSurname] = useState();
        const [city, setCity] = useState();
        const [province, setProvince] = useState();
        const [postal_code, setPostalCode] = useState();
        const [address, setAddress] = useState();
        const [address_specific, setAddressSpecific] = useState();



        const [error, setError] = useState();

        useEffect(() => {

            const getData2 = async () => {
                try {
                    const jsonValue = JSON.parse(await AsyncStorage.getItem('@DireccionesDeEnvio'));
                    console.log("useeffect" + JSON.stringify(jsonValue));
                    if (jsonValue && jsonValue !== '' && jsonValue!==null) {
                        setData(jsonValue)
                    }
                } catch (e) {
                    // error reading value
                }
            }
            getData2();
            JSON.stringify(data)

        }, [modalView]);

        const deleteDatos = (item) => {
            const datosId = item.uid;
            //console.log(articleId);
            const newData = [...data];
            //  console.log(newCarrito);
            for (var i = 0; i < newData.length; i++) {

                if (newData[i].uid === datosId) {
                    newData.splice(i, 1);
                }
            }
            if (newData.length > 0) {
                setData(newData);

            } else {
                setData(null);
            }

            AsyncStorage.setItem('@DireccionesDeEnvio', JSON.stringify(newData));
        }
        const handleEditar = (item) => {
            console.log("hello" + item.uid)

            setUid(item.uid);
            setNif(item.nif);
            setPhone(item.phone);
            setName(item.name);
            setSurname(item.surname);
            setCity(item.city);
            setProvince(item.province);
            setPostalCode(item.postal_code);
            setAddress(item.address);
            setAddressSpecific(item.address_specific);

            setVisible(true)


        }

        const handleSubmit = async () => {


            const valueKey = await AsyncStorage.getItem('@DireccionesDeEnvio');
            const NuevoDatos = ({ uid, nif, phone, name, surname, city, province, postal_code, address, address_specific })
            console.log(uid)

            if (valueKey != null) {
                const theobject = JSON.parse(valueKey);
                for (var i = 0; i < theobject.length; i++) {

                    if (theobject[i].uid === NuevoDatos.uid) {
                        theobject[i] = NuevoDatos;
                        break;
                    }
                }
                await AsyncStorage.setItem('@DireccionesDeEnvio', JSON.stringify(theobject));
                setData(theobject);

            }


            setVisible(false)
        }


        return (
            <>
                <ScrollView style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Datos de envio</Text>
                    </View>


                    {data && data.map((item, index) => {
                            return (

                                <View style={styles.ctnDireccion} key={index}>
                                    <View style={styles.ctnInfo}>
                                        <Text style={styles.nombre}>{item.city.slice(0, 1).toUpperCase() + item.city.slice(1)} {item.province} {item.postal_code} </Text>
                                        <Text>{item.address} </Text>
                                    </View>
                                    <View style={styles.buttons}>
                                        <TouchableOpacity style={styles.btn} onPress={() => deleteDatos(item)}>
                                            <CloseIcon size={25} color="black" />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.btn} onPress={() => handleEditar(item)}>
                                            <Text>Editar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )

                        })
                    }
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent
                    visible={visible}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(1,1,1,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <View style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#fff',
                        }}>
                            <View style={{
                                height: 45,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                padding: 10,
                            }}>
                                <TouchableOpacity onPress={() => setVisible(false)}>
                                    <CloseIcon size={30} color="black" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView>
                                <View style={styles.mcontainer}>
                                    <View style={styles.wrapper} >
                                        <Text style={styles.label}>Nif</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={nif}
                                            onChangeText={text => setNif(text)}

                                        />

                                        <Text style={styles.label}>Teléfono</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={phone}
                                            onChangeText={text => setPhone(text)}

                                        />

                                        <Text style={styles.label}>Nombre</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={name}
                                            onChangeText={text => setName(text)}

                                        />

                                        <Text style={styles.label}>Apellido</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={surname}
                                            onChangeText={text => setSurname(text)}

                                        />


                                        <Text style={styles.label}>Ciudad</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={city}
                                            onChangeText={text => setCity(text)}

                                        />


                                        <Text style={styles.label}>Provincia</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={province}
                                            onChangeText={text => setProvince(text)}

                                        />

                                        <Text style={styles.label}>Código Postal</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={postal_code}
                                            onChangeText={text => setPostalCode(text)}

                                        />


                                        <Text style={styles.label}>Dirección (Ex. Av. Pio XII):</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={address}
                                            onChangeText={text => setAddress(text)}
                                        />
                                        <Text style={styles.label}>Especificaciones dirección (Ex. Nº 1, Esc Izq., Puerta 10) </Text>

                                        <TextInput
                                            style={styles.input}
                                            value={address_specific}
                                            onChangeText={text => setAddressSpecific(text)}
                                        />

                                        <TouchableOpacity style={styles.mBtn} onPress={() => {
                                            handleSubmit()
                                        }}>
                                            <Text style={styles.btnText}>GUARDAR</Text>
                                        </TouchableOpacity>
                                        {error
                                            &&
                                            <Text style={styles.error}>{error}</Text>

                                        }
                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                    </View>


                </Modal>
                {/*modalData && (
                        <ModalEditarDatosFacturacion
                            visible={modalEditarView}
                            onClose={() => setEditarView(false)}
                            data={modalData}
                            setData={setData}
                        />
                    )
                */}

                <View style={styles.btContainer}>
                    <ButtonFinal title="Crear Nuevo" onPress={() => setModalView(true)} />
                </View>
                <ModalCrearDireccionDeEnvio
                    visible={modalView}
                   
                    onClose={() => setModalView(false)}
                />
            </>

        )
    }

    return (
        <>
            <DatosFacturacionStack.Navigator screenOptions={{ headerShown: true }} >
                <DatosFacturacionStack.Screen name="Contacto" component={DireccionesEnvio}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
            </DatosFacturacionStack.Navigator>
        </>
    )



}






const styles = StyleSheet.create({
    containerDefault: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    h1: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 30,
        marginBottom: 20,
    },

    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 100,
        backgroundColor: 'white',
    },
    ctnDireccion: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    ctnInfo: {
        flex: 1,
        justifyContent: 'space-between',
        //backgroundColor: 'blue',
    },
    nombre: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 15,
    },
    tel: {
        color: 'black',
        fontSize: 14,
    },
    info: {
        fontSize: 14,
    },
    buttons: {
        flex: 1,
        height: '100%',
        //backgroundColor:'red',
        flexDirection: 'column',
        maxWidth: 90,
        justifyContent: 'space-between',
        alignContent: 'flex-end',


    },
    btn: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHozontal: 10,
    },
    btContainer: {

        flexDirection: 'row',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: 15,
    },

    ///////////////
    mcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    wrapper: {
        paddingVertical: 15,
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
        color:'black',
    },
    label: {
        color: 'black',
        marginBottom: 4,
    },
    link: {
        color: 'blue',
    },
    loginError: {
        color: 'red',
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#f0e5e4',
    },
    mBtn: {
        backgroundColor: "#FDE619",
        color: 'black',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 7,
        marginTop: 8,
    },
    btnText: {
        fontWeight: '500',
        color: 'black',
    },
    h1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 20,
    },

    error: {
        padding: 10,
        backgroundColor: '#ffefef',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'red',
        color: 'red'
    }
});

