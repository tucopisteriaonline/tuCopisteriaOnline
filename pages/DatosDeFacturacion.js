import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking, Modal, TextInput, Alert } from 'react-native'
import CloseIcon from '../Icons/CloseIcon'
import ButtonFinal from '../components/ButtonFinal'
import ModalCrearDatosFacturacion from '../components/noUse/ModalCrearDatosFacturacion'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TopBackNavigation from '../components/TopBackNabigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin'
import { useEditUser } from '../hooks/useEditUser'
import { API_URL } from "../config"

export const DatosDeFacturacion = () => {
    const DatosFacturacionStack = createNativeStackNavigator();
    const { editUser } = useEditUser();


    const { user } = useAuthContext()
    const { login } = useLogin();
    console.log(user)


    const DatosFacturacion = () => {

        const labels = ["DNI", "TELÉFONO", "NOMBRE", "APELLIDOS", "CIUDAD", "PROVINCIA", "CÓDIGO POSTAL", "DIRECCIÓN","Nº, PISO, PUERTA"]

        const [visible, setVisible] = useState(false);
        const [password, setPassword] = useState(null);
        const [email, setEmail] = useState();
        const [nif, setNif] = useState();
        const [phone, setPhone] = useState();
        const [name, setName] = useState();
        const [surname, setSurname] = useState();
        const [city, setCity] = useState();
        const [province, setProvince] = useState();
        const [postal_code, setPostalCode] = useState();
        const [address, setAddress] = useState();
        const [address_specific, setAddressSpecific] = useState();
        const [uid, setUid] = useState();

        const [error, setError] = useState();



        const infoUser = user.user
        Object.keys(infoUser).forEach(key => {
            if (infoUser[key] === "undefined") {
                infoUser[key] = "";
            }
        });
        const keys = Object.keys(infoUser);

        const handleEditar = async (item) => {

            console.log("hello" + item.pass)
            setUid(item.uid)
            setPassword(item.pass);
            setEmail(item.email);
            setNif(item.nif);
            setPhone(item.phone);
            setName(item.name);
            setSurname(item.surname);
            setCity(item.city);
            setProvince(item.province);
            setPostalCode(item.postal_code);
            setAddress(item.address);
            setAddressSpecific(item.address_specific !== "undefined" ? item.address_specific : '');

            setVisible(true)
        }

        const handleSubmit = async () => {

            //update database
            const response = await fetch(`${API_URL}/user/${uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ email, password, nif, phone, name, surname, city, province, postal_code, address, address_specific })

            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
                return error
            }

            if (response.ok) {
                //update localSorage
                editUser(email, password)
                // login(email, password)
                setError(null)
            }

            setVisible(false)
        }


        return (
            <>
                <ScrollView style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Datos de facturación</Text>
                    </View>

                    {keys.slice(8).map((key, index) => {
                        if (key != "procedencia") {
                            return (
                                <View style={styles.ctnInfo} key={index}>
                                    <Text style={styles.infoLabel}>
                                        {labels[index]}:
                                    </Text>
                                    <Text style={styles.infoValue}>
                                        {infoUser[key] !== "" ? infoUser[key].toUpperCase() : " --- "}
                                    </Text>
                                </View>
                            );
                        }

                    })}

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

                <View style={styles.btContainer}>
                    <ButtonFinal title="Editar" onPress={() => handleEditar(infoUser)} />
                </View>


            </>

        )



    }



    return (
        <>
            <DatosFacturacionStack.Navigator screenOptions={{ headerShown: true }} >
                <DatosFacturacionStack.Screen name="Contacto" component={user ? DatosFacturacion : null}
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
        // backgroundColor:'red',
        flexDirection: 'column',
        maxWidth: 90,
        justifyContent: 'space-between',
        alignContent: 'flex-end',


    },
    btn: {
        //  backgroundColor: 'yellow',
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

    infoLabel: {
        color: 'black',
        marginTop: 10,
        fontSize: 14,
        fontWeight: '400',
    },
    infoValue: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    ctnInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10,
    },
    ctnMain: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
    }

    ,

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

