
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
import { API_URL } from "../config";
const FileConfigurationEdit = ({ route }) => {

    const oldData = route.params.item

    const archivos = oldData.archivos;
    const url = decodeURI(archivos[0].fileCopyUri);


    const [configuracion, setConfig] = useState(oldData.configuracion);
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

    const { price, callPrice } = useCallPrice();


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




    const guardarBasededatos = async () => {
        const id = oldData.id

        const response = await fetch(`${API_URL}/article/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...configuracion, price })
        })
        const json = await response.json()
        if (!response.ok) {
            error = true
            console.log(error)
            return error
        }
        if (response.ok) {
            return 
        }


    }



    //GUARDAR EN CARRITO Y CREAR SI NO EXISTE
    const añadirCarrito = async (Nuevopedido) => {
        // await AsyncStorage.removeItem('@carrito');

        try {
            const valueKey = await AsyncStorage.getItem('@carrito');
            console.log(valueKey)
            console.log(Nuevopedido)
            if (valueKey != null) {
                const theobject = JSON.parse(valueKey);
                for (var i = 0; i < theobject.length; i++) {

                    if (theobject[i].id === Nuevopedido.id) {
                        theobject[i] = Nuevopedido;
                        break;
                    }
                }
                await AsyncStorage.setItem('@carrito', JSON.stringify(theobject));
            }
        } catch (error) {

        }
    }
    //  navigation.navigate('Home');




    const guardar = async () => {
        setIsLoading(true);
        await guardarBasededatos();
        console.log(error)
        const id = oldData.id
        const Nuevopedido = ({
            id, configuracion, archivos, price
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

            navigation.navigate('Carrito');
            setIsLoading(false);
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
    const cancelar = async () => {
        navigation.navigate('Carrito')
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
                    <Btn1 title="Cancelar" onPress={cancelar} />
                    <Btn1 title={"Guardar"} onPress={guardar} />
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

export default FileConfigurationEdit;