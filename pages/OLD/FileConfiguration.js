import React, { useState, useRef } from "react";

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ButtonGroup } from "../components/ButtonGroup";
import { ButtonGroupGif } from "../components/ButtonGroupGif";

import Btn1 from "../components/Btn01";
import { PaginasPorCara } from "../components/PaginasPorCara";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResumenConfTop from "../components/TopResumenConf"

import { useNavigation, CommonActions } from "@react-navigation/native";
import Archivo from "../components/archivo";
import PrecioConf from "../components/PrecioConf";
import GetNumPages from "../components/GetNumPges";
import { set } from "react-native-reanimated";
import BtnInfo from "../components/BtnInfo";
import { err } from "react-native-svg/lib/typescript/xml";

import Form2 from "./OLD/Form2";
export default function FileConfiguration({ route }) {
    const navigation = useNavigation();
    /*INFORMACION DE LOS ARCHIVOS [] */
    const archivos = route.params.archivos;
    const numCaras = route.params.numCaras;
    const [isLoading, setIsLoading] = useState(false);
    //OPCIONES
    let error = false;
    const [copy_number, setCopy_number] = useState(1);
    const [tint, seTint] = useState('BLACK');
    const [format, setFormat] = useState('A4');
    const [paper, setPaper] = useState('80gr');
    const [print_mode, setPrintMode] = useState('2 caras');
    const [finisher_slisdeshow, setFinisher_slisdeshow] = useState('Normal');
    const [orientacion, setOrientacion] = useState('HH');
    const [caras, setCaras] = useState(numCaras);
    const [grouped, setGrouped] = useState('NO AGRUPADO');
    const [price, setPrice] = useState(0);
    const [finishing_price, setFinishing_price] = useState('99');
    const [finisher_colored_skin, setFinisher_colored_skin] = useState('');

    const [finisher_stapled, setFinisher_stapled] = useState('');
    const [finisher_docblock, setFinisher_docblock] = useState('');
    const [paginas_color_seleccionada, setPaginas_color_seleccionada] = useState('');
    const [comentario, setComentario] = useState('');

    const scrollViewRef = useRef(null);

    const setPortada = (value) => {
        if (value === "Portada a Color") {
            setFinisher_colored_skin("Portada a color");
            setPaginas_color_seleccionada('');
        }
        if (value === "Hoja de Color") {
            setPaginas_color_seleccionada(1);
            setFinisher_colored_skin('');
        }
    }

    const acabadoChange = (value) => {

        if (value === "Grapas") {
            setGrouped('');
            setFinisher_stapled("Grapado")
            setFinisher_docblock('');

        }

        if (value === "Sin Acabado") {
            setGrouped('');
            setFinisher_colored_skin('');
            setFinisher_docblock('');
            setFinisher_stapled('');
            setPaginas_color_seleccionada('');
            setFinisher_colored_skin('');

        }
        if (value === "Encuadernado") {
            setGrouped("AGRUPADO");
            setFinisher_docblock("ENCUADERNADO");
            setFinisher_stapled('');
            scrollViewRef.current.scrollToEnd({ animated: true });

        }
    }


    //INFORMACION DE ARTICULO
    const id = Date.now();
    const Configuracion = {
        copy_number, tint, format, paper, print_mode, 
        finisher_slisdeshow, orientacion, finisher_docblock,
         grouped, paginas_color_seleccionada, finisher_colored_skin
        , finisher_stapled, caras
    };
   
    const Nuevopedido = ({
        id, Configuracion, price, archivos
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
    const crearArticuloBDD = async () => {
        const response = await fetch('http://192.168.1.48:5000/api/article', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                tint,
                format,
                paper,
                print_mode,
                grouped,
                copy_number,
                finisher_stapled,
                finisher_docblock,
                finisher_slisdeshow,
                finisher_colored_skin,
                price,
                finishing_price,
                orientacion,
                comentario,
                paginas_color_seleccionada,

            })
        })
        const json = await response.json()
        if (!response.ok) {
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
        }

    }






    //GUARDAR EN CARRITO Y CREAR SI NO EXISTE
    const añadirCarrito = async () => {
        // await AsyncStorage.removeItem('@carrito');
        try {

            const valueKey = await AsyncStorage.getItem('@carrito');
            if (valueKey != null) {
                console.log("carrrito existe")
                const json = JSON.parse(valueKey)
                const newData = [...json, Nuevopedido];
                //console.log(newData)
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
    //navegation carrito
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
    //navegation home
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









    if (isLoading === true) {
        return (<SafeAreaView style={styles.containerDefault}>
            <ActivityIndicator size="large" color="#464644" />
        </SafeAreaView>)
    } else {
        return (
            <>
           
            <Form2 archivos={archivos} caras={caras}/>
            </>
          /* <>
                <ResumenConfTop data={Configuracion} />
                <ScrollView ref={scrollViewRef}>
                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Copias: </Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setCopy_number(copy_number >= 2 ? copy_number - 1 : copy_number)}>
                            <Text style={styles.btnSumarRestar}>
                                -
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.textSumarRestar}>{copy_number}</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setCopy_number(copy_number + 1)}>
                            <Text style={styles.btnSumarRestar}>
                                +
                            </Text>
                        </TouchableOpacity>
                        <BtnInfo title="Información" onPress={() => navigation.navigate("Info")} />

                    </View>
                    <View style={styles.containerOpcion}>
                        <Button title="opcion 1" onPress={() => setComentario(1)} />
                        <Button title="opcion 2" onPress={() => setComentario(2)} />
                        <Text>Comnetario:{comentario}</Text>
                    </View>
                

                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Tinta: </Text>
                        <ButtonGroup
                            default={0}
                            buttons={["BLACK", "COLOR"]}
                            onChange={value => seTint(value)}
                        />
                    </View>


                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Tamaño: </Text>
                        <ButtonGroup
                            default={1}
                            buttons={["A3", "A4", "A5"]}
                            onChange={value => setFormat(value)}
                        />
                    </View>

                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Grosor de papel: </Text>
                        <ButtonGroup
                            default={0}
                            buttons={["80gr", "100gr"]}
                            onChange={value => setPaper(value)}
                        />
                    </View>

                    <View style={styles.containerOpcion}>
                        <Text style={styles.label}>Impresion: </Text>
                        <ButtonGroup
                            default={1}
                            buttons={["1 cara", "2 caras"]}
                            onChange={value => setPrintMode(value)}
                        />
                    </View>

                    <View style={styles.containerOpcion}>
                        <PaginasPorCara
                            default={0}
                            url={archivos[0].uri}
                            onChange={value => setFinisher_slisdeshow(value)} />
                    </View>
                    <Text style={styles.labelTop}>¿Cómo quieres girar la página ? </Text>
                    <View style={styles.containerOpcion}>
                        <ButtonGroupGif
                            default={0}
                            onChange={value => setOrientacion(value)}
                        />
                    </View>
                    <Text style={styles.labelTop}>Acabados: </Text>
                    <View style={styles.containerOpcion}>
                        <ButtonGroup
                            default={0}
                            buttons={["Sin Acabado", "Encuadernado", "Grapas"]}
                            onChange={value => acabadoChange(value)}
                        />
                    </View>

                    {finisher_docblock === "ENCUADERNADO" ?
                        <View style={styles.containerOpcion}>
                            <Text style={styles.labelTop}>Modo: </Text>
                            <ButtonGroup
                                default={0}
                                buttons={["AGRUPADO", "NO AGRUPADO"]}
                                onChange={value => setGrouped(value)}
                            />
                        </View>
                        : null
                    }

                    {finisher_docblock === "ENCUADERNADO" ?
                        <View style={styles.containerOpcion}>
                            <Text style={styles.labelTop}>Portada: </Text>
                            <ButtonGroup
                                buttons={["Portada a Color", "Hoja de Color"]}
                                onChange={value => setPortada(value)}
                            />
                        </View>
                        : null}
                          
                </ScrollView>

                <View style={styles.btn2Container}>

                    <PrecioConf data={Configuracion} onChange={value => setPrice(value)} />
                    <Btn1 title={"Añadir y seguir comprando"} onPress={seguir} />
                    <Btn1 title="Finalizar y pagar" onPress={carrito} />
                </View>
            </>*/
        );
    }

}


const styles = StyleSheet.create({
    containerDefault: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
    titulo: {
        alignSelf: 'center',
        paddingTop: 30,
        margin: 6,
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
    },


    containerOpcion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    resumen: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'black',
        textAlign: 'start',
    },
    resumenText: {
        color: 'black',
        fontSize: 12,
        backgroundColor: '#FDE619',
        padding: 4,
        borderRadius: 4,
        margin: 5,

    },
    btnSumarRestar: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: '#FDE619',
        borderRadius: 3,
        color: 'black',
    },
    textSumarRestar: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black'
    },
    label: {
        fontWeight: '600',
        color: 'black',
        marginRight: 2,
    },
    labelTop: {
        fontWeight: '600',
        color: 'black',
        marginRight: 2,
        marginLeft: 10,
    }
    ,
    btn2Container: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

});
