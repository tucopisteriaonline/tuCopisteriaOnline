import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Linking, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import TopBackNabigation from "../../components/TopBackNabigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopBackNavigation from "../../components/TopBackNabigation";
import { useAuthContext } from "../../hooks/useAuthContext";
import MapsIcon from "../../Icons/MapsIcon";
import { API_URL } from "../../config";

export default EditUser = ({ navigation }) => {

    const TiendasStack = createNativeStackNavigator();
    const { user } = useAuthContext()
    console.log(user)

    const UpdateUser = () => {
        const [isloading, setIsLoading] = useState(false);
        const [error, setError] = useState(false);


        const [email, setEmail] = useState();
        const [password, setPassword] = useState(null);
        const [nif, setNif] = useState(null);
        const [phone, setPhone] = useState(null);
        const [name, setName] = useState(null);
        const [surname, setSurname] = useState(null);
        const [city, setCity] = useState(null);
        const [province, setProvince] = useState(null);
        const [postal_code, setPostalCode] = useState(null);
        const [address, setAddress] = useState(null);
        const [address_specific, setAddressSpecific] = useState(null);
        const [uid, setUid] = useState();
      
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
                setError(null)
                return Alert.alert(
                    "Cambios guardados corectamente",
                    "",
                    [
                        {
                            text: "Cerrar",
                            onPress: () => {
                                navigation.navigate("Home")
                            },
                        },
                    ]
                );
            }

            //update localSorage

        }

        const getData = async () => {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                console.log(response.error)
            }
            if (response.ok) {
                const user = json[0];
                setEmail(user.email)
                setPassword(user.pass)
                setNif(user.nif)
                setPhone(user.phone)
                setName(user.name)
                setSurname(user.surname)
                setCity(user.city)
                setProvince(user.province)
                setPostalCode(user.postal_code)
                setAddress(user.address)
                setAddressSpecific(user.address_specific)
                setUid(user.uid)

                setIsLoading(false)

            }
        }
        useEffect(() => {
            getData();
        }, [])


        if (!isloading) {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.wrapper} >
                            <Text  style={styles.h1}>Datos de acceso</Text>
                            <Text style={styles.label}>Correo</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                            />
                            <Text style={styles.h1}>Datos y dirección de facturación</Text>

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
                                <Text style={styles.btnText}>Guardar Cambios</Text>
                            </TouchableOpacity>
                            {error && <Text style={styles.error}>{error}
                            </Text>}

                        </View>
                    </View>
                </ScrollView>
            )
        } else {
            return (<SafeAreaView style={styles.containerDefault}>
                <ActivityIndicator size="large" color="#464644" />
            </SafeAreaView>)
        }

    }



    return (
        <>
            <TiendasStack.Navigator screenOptions={{ headerShown: true }} >
                <TiendasStack.Screen name="Info" component={UpdateUser}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
            </TiendasStack.Navigator>
        </>
    )
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
