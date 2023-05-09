import React, { useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text, TextInput } from 'react-native';
import CloseIcon from "../Icons/CloseIcon";
import Pdf from "react-native-pdf";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../hooks/useAuthContext";
import { API_URL } from "../config";
export default function ModalCrearDireccionDeEnvio(
    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        setData }) {

    const { user } = useAuthContext();
    const [nif, setNif] = useState(null);
    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [city, setCity] = useState(null);
    const [province, setProvince] = useState(null);
    const [postal_code, setPostalCode] = useState(null);
    const [address, setAddress] = useState(null);
    const [address_specific, setAddressSpecific] = useState(null);


    const [btnState, setBtnState] = useState(true);
    const [error, setError] = useState();
    const handleSubmit = async () => {

        const uid = Date.now()
        const NuevoDatos = ({ uid, nif, phone, name, surname, city, province, postal_code, address, address_specific })
        if (nif && phone && name && surname && city && province && postal_code && address) {
            //await AsyncStorage.removeItem('@DatosDeFacturacion')
            const valueKey = await AsyncStorage.getItem('@DireccionesDeEnvio');

            if (valueKey != null) {
                console.log("DireccionesDeEnvio existe")
                const json = JSON.parse(valueKey)
                const newData = [...json, NuevoDatos];
                console.log(newData)
                await AsyncStorage.setItem('@DireccionesDeEnvio', JSON.stringify(newData));
                //await  setData(newData)
            }
            else {
                console.log("DireccionesDeEnvio no existe")

                await AsyncStorage.setItem('@DireccionesDeEnvio', JSON.stringify([NuevoDatos]));
                console.log("añadido")
                // await setData(NuevoDatos)
            }
            setNif(null)
            setPhone(null)
            setName(null)
            setSurname(null)
            setCity(null)
            setProvince(null)
            setPostalCode(null)
            setAddress(null)
            setAddressSpecific(null)

            onClose();
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

                                <Text style={styles.label}>DNI</Text>
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
                                    onChangeText={text => setName(firstLetterUpper(text))}

                                />

                                <Text style={styles.label}>Apellido</Text>
                                <TextInput
                                    style={styles.input}
                                    value={surname}
                                    onChangeText={text => setSurname(firstLetterUpper(text))}

                                />


                                <Text style={styles.label}>Ciudad</Text>
                                <TextInput
                                    style={styles.input}
                                    value={city}
                                    onChangeText={text => setCity(firstLetterUpper(text))}

                                />


                                <Text style={styles.label}>Provincia</Text>
                                <TextInput
                                    style={styles.input}
                                    value={province}
                                    onChangeText={text => setProvince(firstLetterUpper(text))}

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