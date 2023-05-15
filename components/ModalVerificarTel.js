import React, { useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text, TextInput } from 'react-native';
import CloseIcon from "../Icons/CloseIcon";
import Pdf from "react-native-pdf";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { useAuthContext } from "../hooks/useAuthContext";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";


export default function ModalVerificarTel(
    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        setVerificado,
        setData }) {

    const { user } = useAuthContext();


    const [phone, setPhone] = useState('');
    const [paso, setPaso] = useState(1);
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    //PEDIR NUMERO (INPUT)

    //POST MANDAR NUMERO
    const handleSubmit = async () => {
        if (isValidInput(phone)) {
            const url = `${API_URL}/order/mandarCodigoSMS`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ "phone": phone })
            })

            const json = await response.json();
            console.log(json)
            if (!response.ok) {
                setError(json.error)

            }
            if (response.ok) {
                setError('')
                setPaso(2)
            }
        } else {
            setError("El número de teléfono introducido no tiene el formato correcto. Por favor, revise y vuelva a intentarlo")
        }


    }
    const verificarCodigo = async () => {
        if (codigo) {
            const url = `${API_URL}/order/validarCodigoSMS`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    "codigo": codigo,
                    "phone": phone
                })
            })

            const json = await response.json();
            console.log(json)
            if (!response.ok) {
                setError(json.error)

            }
            if (response.ok) {
                if (json.mssg === "verificado") {
                    console.log("VERIFICADO!!!")
                    await setVerificado(true)
                    setPaso(3)


                } else {
                    setError('El código de verificación no es válido')
                }

            }
        }
        else{
            setError("Introduce un código válido")
        }

    }


    function isValidInput(input) {
        const num = parseFloat(input);
        return !isNaN(num) && num.toString().length <= 10;
    }

    const Cerrar = () => {
        setPaso(1)
        onClose()
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
                        <TouchableOpacity onPress={() => Cerrar()}>
                            <CloseIcon size={30} color="black" />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.container}>
                        <View style={styles.wrapper} >
                            {paso === 1 ?
                                <>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Verificación teléfono móvil</Text>

                                    <Text style={{ color: 'black', marginBottom: 20 }}>Para continuar con el pago del pedido, precisamos validar un número de teléfono. En dos pasos sencillos lo realizaremos rapidamente.</Text>
                                    <Text style={styles.label}>Introduce tu número de teléfono</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={phone}
                                        onChangeText={text => setPhone(text)}
                                        keyboardType="numeric"

                                    />

                                    <TouchableOpacity style={styles.btn} onPress={() => {
                                        handleSubmit()
                                    }}>
                                        <Text style={styles.btnText}>Enviar</Text>
                                    </TouchableOpacity>
                                    {error &&
                                        <Text style={styles.error}>*{error}</Text>}
                                </>
                                : paso === 2 ?
                                    <>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Introduce el codigo</Text>
                                        <Text style={{ color: 'black' }}>Por favor, introduzca el código de verificación recibido por SMS.

                                        </Text>
                                        <Text style={{ color: 'black', marginBottom: 20 }}>
                                            Código enviado al número {phone}
                                        </Text>

                                        <TextInput
                                            style={styles.input}
                                            value={codigo}
                                            onChangeText={text => setCodigo(text)}
                                        />
                                        {error &&
                                            <Text style={styles.error}>*{error}</Text>}
                                        <TouchableOpacity style={styles.btn} onPress={() => {
                                            verificarCodigo()
                                        }}>
                                            <Text style={styles.btnText}>Verificar</Text>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Número de teléfono verificado</Text>
                                        <TouchableOpacity style={styles.btn} onPress={() => {
                                            onClose()
                                        }}>

                                            <Text style={styles.btnText}>Continuar</Text>
                                        </TouchableOpacity>

                                    </>


                            }


                        </View>
                    </View>

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
        paddingVertical: 15,
    },
    wrapper: {

        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
        color: 'black',
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