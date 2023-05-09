import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text, TextInput } from 'react-native';
import CloseIcon from "../../Icons/CloseIcon";
import Pdf from "react-native-pdf";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ModalEditarDireccionesDeEnvio(
    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        setData,
        data }) {

    console.log("data in modal" + JSON.stringify(data))
    const [email, setEmail] = useState(data.email);
    const [nif, setNif] = useState(data.nif);
    const [phone, setPhone] = useState(data.phone);
    const [name, setName] = useState(data.name);
    const [surname, setSurname] = useState(data.surname);
    const [city, setCity] = useState(data.city);
    const [province, setProvince] = useState(data.province);
    const [postal_code, setPostalCode] = useState(data.postal_code);
    const [address, setAddress] = useState(data.address);
    const [address_specific, setAddressSpecific] = useState(data.address_specific);
    const [uid, setUid] = useState(data.uid);

            s

    const [error, setError] = useState();

    const handleSubmit = async () => {

        const valueKey = await AsyncStorage.getItem('@DatosDeFacturacion');
        const NuevoDatos = ({ uid, email, nif, phone, name, surname, city, province, postal_code, address, address_specific })


        if (valueKey != null) {
            const theobject = JSON.parse(valueKey);
            for (var i = 0; i < theobject.length; i++) {

                if (theobject[i].uid === NuevoDatos.uid) {
                    theobject[i] = NuevoDatos;
                    break;
                }
            }
            await AsyncStorage.setItem('@DatosDeFacturacion', JSON.stringify(theobject));
            setData(theobject);

        }


        onClose();
    }
    const closethis = () => {
        onClose();
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
                        <TouchableOpacity onPress={() => closethis()}>
                            <CloseIcon size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View style={styles.container}>
                           
                            <View style={styles.wrapper} >

                                <Text style={styles.label}>Correo</Text>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                />
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

                                <TouchableOpacity style={styles.btn} onPress={() => {
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