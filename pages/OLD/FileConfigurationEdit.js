import React, { useState } from "react";

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TouchableOpacity } from 'react-native';
import { ButtonGroup } from "../components/ButtonGroup";
import { ButtonGroupGif } from "../components/ButtonGroupGif";

import Btn1 from "../components/Btn01";
import { PaginasPorCara } from "../components/PaginasPorCara";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResumenConfTop from "../components/TopResumenConf"

import { useNavigation, CommonActions } from "@react-navigation/native";
import PrecioConf from "../components/PrecioConf";
import BtnInfo from "../components/BtnInfo";

export default function FileConfigurationEdit({ route }) {
    const navigation = useNavigation();
    /*INFORMACION DE LOS ARCHIVOS [] */
    const oldData = route.params.item

    //console.log("THIS IS EDIT PAGE: "+  JSON.stringify(oldData[2]))

    const archivos = oldData.archivos
    const configuracion = oldData.Configuracion
    const url = decodeURI(archivos[0].fileCopyUri);

    //OPCIONES
    //OPCIONES
    const [copy_number, setCopy_number] = useState(configuracion.copy_number);
    const [tint, seTint] = useState(configuracion.tint);
    const [format, setFormat] = useState(configuracion.format);
    const [paper, setPaper] = useState(configuracion.paper);
    const [print_mode, setPrintMode] = useState(configuracion.print_mode);
    const [finisher_slisdeshow, setFinisher_slisdeshow] = useState(configuracion.finisher_slisdeshow);
    const [orientacion, setOrientacion] = useState(configuracion.orientacion);
    const [caras, setCaras] = useState(configuracion.caras);
    const [grouped, setGrouped] = useState(configuracion.grouped);


    const [price, setPrice] = useState(oldData.price);
    const [finisher_colored_skin, setFinisher_colored_skin] = useState(configuracion.finisher_colored_skin);

    const [finisher_stapled, setFinisher_stapled] = useState(configuracion.finisher_stapled);
    const [finisher_docblock, setFinisher_docblock] = useState(configuracion.finisher_docblock);
    const [paginas_color_seleccionada, setPaginas_color_seleccionada] = useState(configuracion.paginas_color_seleccionada);
    const [comentario, setComentario] = useState('');

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
        }
    }


    //INFORMACION DE ARTICULO
    const id = oldData.id;
    const Configuracion = {
        copy_number, tint, format, paper, print_mode, finisher_slisdeshow, orientacion, finisher_docblock, grouped, paginas_color_seleccionada, finisher_colored_skin
        , finisher_stapled, caras
    };
    const Nuevopedido = ({
        id, Configuracion, price, archivos
    });

    const guardarCambios = async () => {

        try {
            const valueKey = await AsyncStorage.getItem('@carrito');
            if (valueKey != null) {
                const theobject = JSON.parse(valueKey);
                for (var i = 0; i < theobject.length; i++) {
                    if (theobject[i].id === id) {
                        theobject[i] = Nuevopedido;
                        break;
                    }
                }
                await AsyncStorage.setItem('@carrito', JSON.stringify(theobject));
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    const guardar = async () => {
        await guardarCambios();
        await navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            })
        );
        navigation.navigate('Carrito')
    }

    const cancelar = async () => {
        navigation.navigate('Carrito')
    }


    return (
        <>
         <ResumenConfTop data={Configuracion} />
            <ScrollView>
                <View style={styles.containerOpcion}>
                    <Text style={styles.label}>Copias: </Text>
                    <TouchableOpacity onPress={() => setCopy_number(copy_number >= 1 ? copy_number - 1 : copy_number)}>
                        <Text style={styles.btnSumarRestar}>
                            -
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.textSumarRestar}>{copy_number}</Text>
                    <TouchableOpacity onPress={() => setCopy_number(copy_number + 1)}>
                        <Text style={styles.btnSumarRestar}>
                            +
                        </Text>
                    </TouchableOpacity>
                    <Button title="Información" />
                </View>

                <View style={styles.containerOpcion}>
                    <Text style={styles.label}>Tinta: </Text>
                    <ButtonGroup
                        default={tint === "COLOR" ? 0 : 1}
                        buttons={["COLOR", "BLACK"]}
                        onChange={value => seTint(value)}
                    />
                </View>


                <View style={styles.containerOpcion}>
                    <Text style={styles.label}>Tamaño: </Text>
                    <ButtonGroup
                        default={format === "A3" ? 0 : format === "A4" ? 1 : 2}
                        buttons={["A3", "A4", "A5"]}
                        onChange={value => setFormat(value)}
                    />
                </View>

                <View style={styles.containerOpcion}>
                    <Text style={styles.label}>Grosor de papel: </Text>
                    <ButtonGroup
                        default={paper === "80gr" ? 0 : 1}
                        buttons={["80gr", "100gr"]}
                        onChange={value => setPaper(value)}
                    />
                </View>

                <View style={styles.containerOpcion}>
                    <Text style={styles.label}>Impresion: </Text>
                    <ButtonGroup
                        default={print_mode === "2 caras" ? 0 : 1}
                        buttons={["2 caras", "1 cara"]}
                        onChange={value => setPrintMode(value)}
                    />
                </View>
                <View style={styles.containerOpcion}>
                    <PaginasPorCara
                        url={url}
                        default={finisher_slisdeshow === "Normal" ? 0 :
                            finisher_slisdeshow === "2/Vertical" ? 1 :
                                finisher_slisdeshow === "2/Horizontal" ? 2 : 3}
                        onChange={value => setFinisher_slisdeshow(value)} />
                </View>
                <Text style={styles.labelTop}>¿Cómo quieres girar la página ? </Text>
                <View style={styles.containerOpcion}>
                    <ButtonGroupGif
                        default={
                            orientacion === "HH" ? 0 :
                                orientacion === "HV" ? 1 : 2
                        }
                        onChange={value => setOrientacion(value)}
                    />
                </View>
                <Text style={styles.labelTop}>Acabados: </Text>
                <View style={styles.containerOpcion}>
                    <ButtonGroup
                        default={finisher_docblock === "ENCUADERNADO" ? 1 :
                            finisher_stapled === "Grapado" ? 2 : 0}
                        buttons={["Sin Acabado", "Encuadernado", "Grapas"]}
                        onChange={value => acabadoChange(value)}
                    />
                </View>

                {finisher_docblock === "ENCUADERNADO" ?
                    <View style={styles.containerOpcion}>
                        <Text style={styles.labelTop}>Modo: </Text>
                        <ButtonGroup
                            default={grouped === "AGRUPADO" ? 0 : 1}
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
                <Btn1 title="Cancelar" onPress={cancelar} />
                <Btn1 title={"Guardar"} onPress={guardar} />

            </View>
        </>
    );

}


const styles = StyleSheet.create({

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
