import React, { useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text, TextInput } from 'react-native';
import CloseIcon from "../Icons/CloseIcon";
import Pdf from "react-native-pdf";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalCrearTarjeta(
    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        setData }) {


    const [numTarjeta, setNumTarjeta] = useState(null);
    const [caducidad, setCaducidad] = useState(null);



    const [btnState, setBtnState] = useState(true);
    const [error, setError] = useState();
    const handleSubmit = async () => {

        const uid = Date.now()
        const NuevoDatos = ({ uid,numTarjeta,caducidad })
        if (numTarjeta && caducidad) {

            //await AsyncStorage.removeItem('@DatosDeFacturacion')
            const valueKey = await AsyncStorage.getItem('@Tarjetas');

            if (valueKey != null) {
                console.log("DireccionesDeEnvio existe")
                const json = JSON.parse(valueKey)
                const newData = [...json, NuevoDatos];
                console.log(newData)
                await AsyncStorage.setItem('@Tarjetas', JSON.stringify(newData));
                setData(newData)
            }
            else {
                console.log("DireccionesDeEnvio no existe")

                await AsyncStorage.setItem('@Tarjetas', JSON.stringify([NuevoDatos]));
                console.log("añadido")
                setData(NuevoDatos)
            }
            setNumTarjeta(null)
            setCaducidad(null)
           

            onClose();
        }
        else {
            setError("Rellena todos los campos")
        }
    }
    const firstLetterUpper = (e) => {
        return e.slice(0, 1).toUpperCase() + e.slice(1);
    }
    return (
        <Modal
            animationType="fade"
            onDismiss={onDismiss}
            onShow={onShow}
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
                        <TouchableOpacity onPress={onClose}>
                            <CloseIcon size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.wrapper} >

                                <Text style={styles.label}>Num Tarjeta</Text>
                                <TextInput
                                    style={styles.input}
                                    value={numTarjeta}
                                    onChangeText={text => setNumTarjeta(text)}

                                />

                                <Text style={styles.label}>Feca caducidad</Text>
                                <TextInput
                                    style={styles.input}
                                    value={caducidad}
                                    onChangeText={text => setCaducidad(text)}

                                />

                  

                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    handleSubmit()
                                }}>
                                    <Text style={styles.btnText}>Crear</Text>
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
    );
}

const styles = StyleSheet.create({
    containerDefault: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
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
    btn: {
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