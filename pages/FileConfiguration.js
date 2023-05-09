
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BtnInfo from "../components/BtnInfo";
import { useCallPrice } from "../hooks/useCalPrice";
import TopBackNavigationConf from "../components/TopBackNabigationConf";
import TopResumenConf from "../components/TopResumenConf";
import MyButton from "./OLD/myButton";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ButtonGroupGif } from "./OLD/ButtonGroupGif";
import MyButtonColor from "./OLD/myButtonColor";
import { PaginasPorCara } from "./OLD/PaginasPorCara";
import Btn1 from "../components/Btn01";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from "../config"

const FileConfiguration = ({ route }) => {
    const archivos = route.params.archivos;
    const caras = route.params.numCaras;
    const [articuloId, setArticuloId] = useState();
    const [configuracion, setConfig] = useState({
        "caras": caras,
        "copy_number": 1,
        "tint": "BLACK",
        "format": "A4",
        "paper": "80gr",
        "print_mode": "2 caras",
        "finisher_slisdeshow": "Normal",
        "orientacion": "HH",
        "acabado": "Sin Acabado",
        "grouped": "NO AGRUPADO",
        "paginas_color_seleccionada": "",
        "finishing_price": "0",
        "finisher_stapled": "",
        "finisher_plastificed": "",
        "finisher_docblock": "",
        "finisher_colored_skin": "",
        "comentario": "",

    });
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    //OPCIONES
    let error = false;

    const change = (value, opt) => {
        console.log("change value");
        setConfig((prev) => ({ ...prev, [opt]: value }));
    };
    const acabadoChange = (value, opt) => {
        setConfig((prev) => ({ ...prev, [opt]: value }));

        if (value === "Grapas") {
            setConfig((prev) => ({ ...prev, "grouped": "" }));
            setConfig((prev) => ({ ...prev, "finisher_stapled": "Grapado" }));
            setConfig((prev) => ({ ...prev, "finisher_colored_skin": "" }));
            setConfig((prev) => ({ ...prev, "finisher_docblock": "" }));
            setConfig((prev) => ({ ...prev, "paginas_color_seleccionada": "" }));
            setConfig((prev) => ({ ...prev, "finisher_colored_skin": "" }));
            setConfig((prev) => ({ ...prev, "hoja_de_color": "" }));;
        }
        if (value === "Sin Acabado") {
            setConfig((prev) => ({ ...prev, "grouped": "" }));
            setConfig((prev) => ({ ...prev, "finisher_colored_skin": "" }));
            setConfig((prev) => ({ ...prev, "finisher_docblock": "" }));
            setConfig((prev) => ({ ...prev, "finisher_stapled": "" }));
            setConfig((prev) => ({ ...prev, "paginas_color_seleccionada": "" }));
            setConfig((prev) => ({ ...prev, "finisher_colored_skin": "" }));
            setConfig((prev) => ({ ...prev, "hoja_de_color": "" }));
        }
        if (value === "Encuadernado") {
            setConfig((prev) => ({ ...prev, "grouped": "AGRUPADO" }));
            setConfig((prev) => ({ ...prev, "finisher_docblock": "ENCUADERNADO" }));
            setConfig((prev) => ({ ...prev, "finisher_stapled": "" }));
        }
    }

    const setPortada = (value, opt) => {
        setConfig((prev) => ({ ...prev, [opt]: value }));

        if (value === "Portada a Color") {
            setConfig((prev) => ({ ...prev, "finisher_colored_skin": "Portada a Color" }));
            setConfig((prev) => ({ ...prev, "paginas_color_seleccionada": "" }));
            setConfig((prev) => ({ ...prev, "hoja_de_color": "" }));
        }
        if (value === "Hoja de Color") {
            setConfig((prev) => ({ ...prev, "paginas_color_seleccionada": "1" }));
            setConfig((prev) => ({ ...prev, "finisher_colored_skin": "" }));
        }
    }

    const { price, finishing_price, callPrice } = useCallPrice();


    useEffect(() => {
        setTimeout(() => {
            const setPrice = async () => {
               
                await callPrice(configuracion)
                navigation.setOptions({ headerTitle: () => <TopBackNavigationConf count={price} /> });
            }
            setPrice();
            setIsLoading(false)
        }, 100)

    }, [configuracion, price])




    const crearArticuloBDD = async () => {
        const response = await fetch(`${API_URL}/article`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...configuracion, price, finishing_price })
        })
        const json = await response.json()
        if (!response.ok || json.articuloId === true) {
            console.log(json)
            error = true

            return error

        }
        if (response.ok) {
            console.log(json.articuloId)
            error = false
            return json.articuloId
        }
    }
    const guardarBasededatos = async () => {
        const articuloID = await crearArticuloBDD();
        console.log("ARTICULO ID PARA USAR" + articuloID)
        if (!error) {
            await guardarArchivos(articuloID);
            return articuloID
        }


    }


    const guardarArchivos = async (idArticulo) => {

        let formData = new FormData();
        let pages = []
        archivos.forEach(file => {
            formData.append('files', {
                uri: file.uri,
                name: file.name,
                type: file.type,

            });
            pages = [...pages, file.pages]
        });


        const data = { idArticulo, pages };

        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const response = await fetch(`${API_URL}/article/files`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })

        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            error = true;
            console.log("ERROR:" + error)
        }
        if (response.ok) {
            error = false;
            console.log(response)
        }
    }

    //GUARDAR EN CARRITO Y CREAR SI NO EXISTE
    const añadirCarrito = async (Nuevopedido) => {
        // await AsyncStorage.removeItem('@carrito');
        try {

            const valueKey = await AsyncStorage.getItem('@carrito');
            if (valueKey != null) {
                console.log("carrrito existe")
                const json = JSON.parse(valueKey)
                const newData = [...json, Nuevopedido];
                console.log(newData)
                await AsyncStorage.setItem('@carrito', JSON.stringify(newData));
            }
            else {
                console.log("carrrito no existe")

                await AsyncStorage.setItem('@carrito', JSON.stringify([Nuevopedido]));
                console.log("añadido")
            }
        } catch (error) {
            // Error retrieving data
        }
        //  navigation.navigate('Home');

    }


    const carrito = async () => {
        setIsLoading(true);
        const id = await guardarBasededatos();
        console.log("ERRORORORORORO"+error)

        const Nuevopedido = ({
            id, configuracion, archivos, price, finishing_price
        });
        if (!error) {
           
            await añadirCarrito(Nuevopedido);
            await navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'CreatePedidoStack' },
                    ],
                })
            );
            setIsLoading(false);
            navigation.navigate('Carrito');
        }
        else {
        
            setIsLoading(false);
            Alert.alert('Error', 'error al subir archivos ', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }

    }

    const seguir = async () => {

        setIsLoading(true);
        const id = await guardarBasededatos();
        console.log(error)

        const Nuevopedido = ({
            id, configuracion, archivos, price, finishing_price
        });
        if (!error) {
            await añadirCarrito(Nuevopedido);
            await navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'Home' },
                    ],
                })
            );
            setIsLoading(false);
            navigation.navigate('Home')
        }
        else {
            setIsLoading(false);
            Alert.alert('Error', 'error al subir archivos ', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }

    }

    if (isLoading === true) {
        return (<SafeAreaView style={styles.containerDefault}>
            <ActivityIndicator size="large" color="#464644" />
        </SafeAreaView>)
    } else {
        return (

            <>
                <TopResumenConf data={configuracion} />
                <ScrollView style={styles.mainCtn}>
                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Copias:</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                ...styles.button,
                                backgroundColor: "#FDE619",
                                marginRight: 10,

                            }}
                            onPress={() => change(
                                configuracion.copy_number >= 2 ?
                                    configuracion.copy_number - 1 : 1, "copy_number")
                            }
                        >
                            <Text style={styles.btnText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.btnText}>{configuracion.copy_number}</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                ...styles.button,
                                backgroundColor: "#FDE619",
                                marginHorizontal: 10,

                            }}
                            onPress={() => change(configuracion.copy_number + 1, "copy_number")}
                        >
                            <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                        <BtnInfo title="Información" onPress={() => navigation.navigate("Info")} />

                    </View>
                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Tinta:</Text>
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"tint"}
                            value={"BLACK"}
                        />
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"tint"}
                            value={"COLOR"}
                        />
                    </View>

                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Tamaño:</Text>
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"format"}
                            value={"A3"}
                        />
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"format"}
                            value={"A4"}
                        />
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"format"}
                            value={"A5"}
                        />
                    </View>
                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Grosor del papel: </Text>
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"paper"}
                            value={"80gr"}
                        />
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"paper"}
                            value={"100gr"}
                        />
                    </View>

                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Impresión: </Text>
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"print_mode"}
                            value={"1 cara"}
                        />
                        <MyButton
                            change={change}
                            configuracion={configuracion}
                            opt={"print_mode"}
                            value={"2 caras"}
                        />

                    </View>

                    <View style={styles.containerOpcion}>

                        <PaginasPorCara
                            url={archivos[0].uri}
                            change={change}
                            configuracion={configuracion}
                        />


                    </View>

                    <Text style={styles.label}>¿Cómo quieres girar la página?</Text>
                    <View style={styles.containerOpcion}>

                        <ButtonGroupGif change={change} configuracion={configuracion} />
                    </View>
                    <Text style={styles.label}>Acabados: </Text>
                    <View style={styles.containerOpcion}>
                        <MyButton
                            change={acabadoChange}
                            configuracion={configuracion}
                            opt={"acabado"}
                            value={"Sin Acabado"}
                        />
                        <MyButton
                            change={acabadoChange}
                            configuracion={configuracion}
                            opt={"acabado"}
                            value={"Encuadernado"}
                        />
                        <MyButton
                            change={acabadoChange}
                            configuracion={configuracion}
                            opt={"acabado"}
                            value={"Grapas"}
                        />
                    </View>

                    {configuracion.finisher_docblock === "ENCUADERNADO" ?
                        <View style={styles.containerOpcion}>
                            <Text style={styles.label}>Modo: </Text>
                            <MyButton
                                change={change}
                                configuracion={configuracion}
                                opt={"grouped"}
                                value={"AGRUPADO"}
                            />
                            <MyButton
                                change={change}
                                configuracion={configuracion}
                                opt={"grouped"}
                                value={"NO AGRUPADO"}
                            />
                        </View>
                        : null}
                    {configuracion.finisher_docblock === "ENCUADERNADO" ?
                        <View style={styles.containerOpcion}>
                            <Text style={styles.label}>Portada: </Text>
                            <MyButton
                                change={setPortada}
                                configuracion={configuracion}
                                opt={"finisher_colored_skin"}
                                value={"Portada a Color"}
                            />

                            <MyButton
                                change={setPortada}
                                configuracion={configuracion}
                                opt={"hoja_de_color"}
                                value={"Hoja de Color"}
                            />

                        </View>
                        : null
                    }

                    {configuracion.hoja_de_color === "Hoja de Color" ?
                        <>
                            <Text style={styles.label}>Color de la hoja: </Text>

                            <View style={styles.containerOpcion}>

                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"1"}
                                    color={"#71CAE6"}
                                />
                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"2"}
                                    color={"#80C9C2"}
                                />
                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"3"}
                                    color={"#FFE996"}
                                />
                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"4"}
                                    color={"#D78CBB"}
                                />
                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"5"}
                                    color={"#214C9B"}
                                />
                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"6"}
                                    color={"#66B32D"}
                                />
                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"7"}
                                    color={"#E51C21"}
                                />
                                <MyButtonColor
                                    change={change}
                                    configuracion={configuracion}
                                    opt={"paginas_color_seleccionada"}
                                    value={"8"}
                                    color={"white"}
                                />

                            </View>
                        </>
                        : null
                    }

                    {/*<Text>{JSON.stringify(configuracion)}</Text>*/}
                </ScrollView>
                <View style={styles.btn2Container}>
                    <Btn1 title={"Añadir y seguir "} onPress={seguir} />
                    <Btn1 title="Finalizar y pagar" onPress={carrito} />
                </View>
            </>
        )
    }
};

const styles = StyleSheet.create({
    mainCtn: {
        paddingHorizontal: 10,
    },
    containerOpcion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginVertical: 10,
    },
    containerDefault: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        paddingVertical: 8,
        borderRadius: 3,
        flex: 1,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    },
    btn2Container: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    label: {
        fontWeight: '600',
        color: 'black',
        paddingRight: 8,
    },

});

export default FileConfiguration;