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
import { useLogin } from '../../hooks/useLogin';
import GoogleIcon from "../../Icons/GoogleIcon";
import FacebookIcon from "../../Icons/FacebookIcon";

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { API_URL } from '../../config';

const Register = ({ navigation }) => {

    const { signup, error, isLoding } = useSignup();
    const { login, loginError, isLoading } = useLogin();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);


    GoogleSignin.configure({
        webClientId: '361319660519-j0vsvfbghvjcmvbfj13en74n9pfpqnm4.apps.googleusercontent.com',
    });

    const handleSubmit = async () => {
        await signup(email, password, name)

    }

    async function onGoogleButtonPress() {

        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Get the users ID token
        const googleData = await GoogleSignin.signIn();

        console.log(JSON.stringify(googleData))

        const GoogleEmail = googleData.user.email
        const GoogleId = googleData.user.id
        const GoogleName = googleData.user.givenName
        const GoogleSurname = googleData.user.familyName

        //CHECK IF USER REGISTER
        const response = await fetch(`${API_URL}/user/checkEmail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "email": GoogleEmail })
        })

        if (!response.ok) {
            //IF IMAIL EXIST THEN LOGIN
            login(GoogleEmail, GoogleId)
        }
        if (response.ok) {
            //IF IMAIL DONT EXIST THEN REGISTER

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(googleData.idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential)
                .then(() => {
                    console.log('log in!');
                    signup(GoogleEmail, GoogleId, GoogleName, GoogleSurname)

                    auth()
                        .signOut()
                        .then(() => {
                            console.log('User signed out!')
                        });
                    GoogleSignin.revokeAccess();
                    GoogleSignin.signOut();

                })
                .catch(error => {
                    console.log(error);
                    AlertError("Error", error)
                });
        }


    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        console.log(JSON.stringify(data))

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        // Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);

        auth().onAuthStateChanged(async (user) => {
            console.log(user)
            const FacebookEmail = user.email
            const FacebookId = user.uid
            const FacebookName = user.displayName

            const response = await fetch(`${API_URL}/user/checkEmail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "email": FacebookEmail })
            })

            if (!response.ok) {
                console.log("login with facebook")
                //IF IMAIL EXIST THEN LOGIN
                login(FacebookEmail, FacebookId)
            }
            if (response.ok) {
                console.log("register with facebook")
                //IF IMAIL DONT EXIST THEN REGISTER
                signup(FacebookEmail, FacebookId, FacebookName)

            }
            setLoading(false)

        });
    }



    return (

        <View style={styles.container}>
            <View style={styles.wrapper} >
                <ScrollView>

                    <Text style={styles.h1}>Registro</Text>

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



                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}


                    />
                    {error && <Text style={styles.error}>*{error}
                    </Text>}
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        handleSubmit()
                    }}>


                        <Text style={styles.btnText}>Registrarse</Text>
                    </TouchableOpacity>


                    <Text style={{ ...styles.label, textAlign: 'center' }}>Or</Text>

                    <TouchableOpacity style={{ ...styles.btnGoogle, borderColor: "black" }} onPress={() => onGoogleButtonPress()}>
                        <GoogleIcon size={25} color={"#EA4335"} />
                        <Text style={{ ...styles.btnText, marginLeft: 15, color: "black" }}>Continuar con Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.btnGoogle, borderColor: "black" }} onPress={() => onFacebookButtonPress()}>
                        <FacebookIcon size={25} color={"#1778F2"} />
                        <Text style={{ ...styles.btnText, marginLeft: 15, color: "black" }}>Continuar con Facebook</Text>
                    </TouchableOpacity>





                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={styles.text}>¿Tienes una cuenta? </Text>
                        <TouchableOpacity>
                            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wrapper: {
        width: '80%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 14,
        color:'black',
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

    },
    btn: {
        backgroundColor: "#FDE619",
        color: 'black',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 7,
        marginVertical: 15,
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
        marginBottom: 40,
    },
    label: {
        color: 'black',
        marginBottom: 4,
    },
    error: {
        paddingBottom: 5,
        color: 'red'
    },
    text: {
        color: 'black',
    },

    btnGoogle: {
        flexDirection: 'row',
        marginVertical: 5,
        borderWidth: 1,
        alignItems: 'center',
        padding: 12,
        borderRadius: 7,
    }

});

export default Register;
