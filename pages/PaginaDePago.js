import React, { useState, useEffect ,useContext} from "react";
import { Text, StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { useNavigation, CommonActions, useFocusEffect } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { useAuthContext } from "../hooks/useAuthContext";
import { API_URL } from "../config";
import SuccesAlert from "../components/Alerts/SuccesAlert";
import ErrorAlert from "../components/Alerts/ErrorAler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCarritoState } from "../hooks/useCarritoState"
;
import { CarritoContext } from "../App";
export default PaginaDePago = ({ route }) => {
    const amount = route.params.amount;
    const order_uid = route.params.order_uid;
    const [carritoState, setCarritoState] = useContext(CarritoContext);

    const { suma, setSuma } = useCarritoState();
    const navigation = useNavigation(true);
    const { user } = useAuthContext();

    const [response, setResponse] = useState();
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true)
    const [resState, setResState] = useState('');

    const handleNavigationStateChange = async (navState) => {

        console.log("change" + navState.url)
        const desiredRoute = 'https://tucopisteriaonline.es/copisteria/?status=okey';
        const desiredRoute2 = 'https://tucopisteriaonline.es/copisteria/?status=ko';


        if (navState.url === desiredRoute) {
            setVisible(false)
            const response = await fetch(`${API_URL}/order/validarOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ order_uid })
            })
            const json = await response.json()
            console.log(json)
            if (!response.ok) {
                setResState("error")
            }
            if (response.ok) {
                await AsyncStorage.removeItem('@carrito');
                navigation.setOptions({
                    tabBarBadge: (suma - 1),
                });
                setCarritoState()

                setResState("succes")



                /*navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Home' },
                        ],
                    })
                );

               navigation.navigate('Home')
                return Alert.alert(
                    "Succes",
                    "La transacción ha sido realizada correctamente",
                    [
                        // The "Yes" button
                        {
                            text: "Cerrar",
                            onPress: () => {
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 1,
                                        routes: [
                                            { name: 'Home' },
                                        ],
                                    }),
                                    navigation.navigate('Home')
                                );
                            },
                        },

                    ]
                );*/
            }
        }

        if (navState.url === desiredRoute2) {
            setResState("error")
            setVisible(false)
            setData()
            setResponse(navState.url);
        }
    };


    useEffect(() => {

        const getData = async () => {
            // const NumPedido = await generarNumeroTransaccion();
            const amount = await route.params.amount;
            const metodoDePago = await route.params.metodoDePago;
            const NumPedido = Math.random().toString(36).substring(2, 14);
            let metodoPago = "1";
            if (metodoDePago === "TARJETA") {
                metodoPago = "1";
            }
            if (metodoDePago === "BIZUM") {
                metodoPago = "z";
            }

            const response = await fetch(`${API_URL}/order/realizarPago`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    "amount": `${amount}`,
                    "order_uid": `${order_uid}`,
                    "metodoPago": `${metodoPago}`,
                })
            })
            const json = await response.json()
            //  console.log("JSON" + json.data.Ds_MerchantParameters)

            if (!response.ok) {
                console.log(json.error)
            }

            if (response.ok) {
                // console.log(json)
                /*const dataFinal = "Ds_MerchantParameters=" + json.data.Ds_MerchantParameters + "&Ds_SignatureVersion=HMAC_SHA256_V1&Ds_Signature=" + json.data.Ds_Signature */
                console.log(json.data)
                setData(json.data)
                setLoading(false)
            }
        }
        getData();
    }, [])



    if (loading && !data) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#464644" />
            </View>
        )

    } else {
        if (visible) {
            return (<WebView
                source={{ html: data }}
                style={{ flex: 1 }}
                onNavigationStateChange={handleNavigationStateChange}
            />)
        }
    }
    if (resState === "error") {
        return (
            <ErrorAlert />
        )
    }
    if (resState === "succes") {
        return (
            <SuccesAlert />
        )
    }

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },


});

/*useEffect(() => {

     const getData = async () => {
         const generarNumeroTransaccion = async () => {
             // Generar un número aleatorio de hasta 9 dígitos
             let num = Math.floor(Math.random() * 1000000000);

             // Añadir ceros a la izquierda hasta que tenga 9 dígitos
             num = num.toString().padStart(9, "0");

             // Añadir un sufijo basado en el tiempo actual para hacer el número único
             const now = new Date();
             const suffix = `${now.getUTCMilliseconds()}`;
             const numTransaccion = `${num}${suffix}`;

             return numTransaccion;
         }
         const NumPedido = await generarNumeroTransaccion();
         const amount = await route.params.amount;




         const response = await fetch('http://192.168.1.48:5000/api/order/realizarPago', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${user.token}`
             },
             body: JSON.stringify({
                 "amount": `${amount}`,
                 "order_uid": `${NumPedido}`,
             })
         })
         const json = await response.json()
         if (!response.ok) {
             console.log(json.error)
         }

         if (response.ok) {
             console.log(json.data)
             const dataFinal = "Ds_MerchantParameters=" + json.data.Ds_MerchantParameters + "&Ds_SignatureVersion=HMAC_SHA256_V1&Ds_Signature=" + json.data.Ds_Signature + ""
             //console.log(dataFinal)
             setData(dataFinal)
             setLoading(false)
         }
     }
     getData();
 }, [])*/
