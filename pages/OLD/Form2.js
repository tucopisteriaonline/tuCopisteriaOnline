import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BtnInfo from "../../components/BtnInfo";
import PrecioConf from "../../components/PrecioConf";
import { useCallPrice } from "../../hooks/useCalPrice";
import TopBackNavigationConf from "../../components/TopBackNabigationConf";
import TopResumenConf from "../../components/TopResumenConf";
import MyButton from "./myButton";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ButtonGroupGif } from "./ButtonGroupGif";
import MyButtonColor from "./myButtonColor";
import { PaginasPorCara } from "./PaginasPorCara";
import Btn1 from "../../components/Btn01";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = ({ archivos, caras }) => {
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
    });
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
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

    const { price, callPrice } = useCallPrice();


    useEffect(() => {
        setTimeout(() => {
            const setPrice = async () => {
                await callPrice(configuracion)
                navigation.setOptions({ headerTitle: () => <TopBackNavigationConf count={price} /> });
            }
            setPrice();
        }, 100)

    }, [configuracion, price])


    const seguir = async () => {
        await añadirCarrito();
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            })
        );
        navigation.navigate('Home')
    }
    const crearArticuloBDD = async () => {
        const response = await fetch('http://192.168.1.48:5000/api/article', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...configuracion, price })
        })
        const json = await response.json()
        if (!response.ok || json.articuloId === true) {
            error = true
            console.log(error)
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
        }

    }
    const id = Date.now();
    const Nuevopedido = ({
        id, configuracion, archivos, price
    });

    const guardarArchivos = async (idArticulo) => {
        let formData = new FormData();
        archivos.forEach(file => {
            formData.append('files', {
                uri: file.uri,
                name: file.name,
                type: file.type,
            });
        });

        const data = { idArticulo };

        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const response = await fetch('http://192.168.1.48:5000/api/article/files', {
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
    const añadirCarrito = async () => {
        //await AsyncStorage.removeItem('@carrito');
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
        await guardarBasededatos();
        console.log(error)
        if (!error) {
            await añadirCarrito();
            await navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'Home' },
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
    if (isLoading === true) {
        return (<SafeAreaView style={styles.containerDefault}>
            <ActivityIndicator size="large" color="#464644" />
        </SafeAreaView>)
    } else {
        return (

            <>
                <TopResumenConf data={configuracion} />
                <ScrollView >
                    <View style={styles.containerOpcion}>
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

                        <Text>{configuracion.copy_number}</Text>
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

                   {/* <View style={styles.containerOpcion}>
                        <ButtonGroupGif change={change} configuracion={configuracion} />
                        </View>*/}

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
                        : null
                    }

                    {/*<Text>{JSON.stringify(configuracion)}</Text>*/}
                </ScrollView>
                <View style={styles.btn2Container}>
                    <Btn1 title={"Añadir y seguir comprando"} onPress={seguir} />
                    <Btn1 title="Finalizar y pagar" onPress={carrito} />
                </View>
            </>
        )
    }
};

const styles = StyleSheet.create({
    containerOpcion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
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

});

export default Form;