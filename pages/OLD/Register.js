import React, { useContext, useState } from 'react';
import {
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';
import { useSignup } from '../../hooks/useSignup';

const Register = ({ navigation }) => {

    const { signup, error, isLoding } = useSignup();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [nif, setNif] = useState(null);
    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [city, setCity] = useState(null);
    const [province, setProvince] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [address, setAddress] = useState(null);
    const [addressSpecific, setAddressSpecific] = useState(null);

    const handleSubmit = async () => {
        await signup(email, password, nif, phone, name, surname, city, province, postalCode, address, addressSpecific)
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.wrapper} >

                    <Text style={styles.h1}>TuCopisteriaOnline</Text>

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
                        value={postalCode}
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
                        value={addressSpecific}
                        onChangeText={text => setAddressSpecific(text)}

                    />





                    <TouchableOpacity style={styles.btn} onPress={() => {
                        handleSubmit()
                    }}>
                        <Text style={styles.btnText}>Entrar</Text>
                    </TouchableOpacity>
                    {error && <Text style={styles.error}>{error}
                    </Text>}

                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={styles.text}>¿Tienes una cuenta? </Text>
                        <TouchableOpacity>
                            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
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
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 40,
    },
    label: {
        color: 'black',
        marginBottom: 4,
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

export default Register;
