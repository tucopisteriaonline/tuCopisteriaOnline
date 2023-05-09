import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Linking, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopBackNavigation from "../../components/TopBackNabigation";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useIsFocused } from '@react-navigation/native';
import { API_URL } from "../../config";
import { cos } from "react-native-reanimated";


export default MisPedidos = ({ navigation }) => {

    const TiendasStack = createNativeStackNavigator();

    const Pedidos = () => {
        const { user } = useAuthContext()
        const isFocused = useIsFocused();
        const [pedidos, setPedidos] = useState();

        const getData = async () => {
        
            const response = await fetch(`${API_URL}/order`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok) {
                console.log(response.error)
            }
            if (response.ok) {
                const pedidos = json.pedidos
                const status = json.status


                const pedidosStatus = pedidos.map(pedido => {
                    const orderStatus = status.find(status => status.uid === pedido.order_status_uid);
                    return {
                        ...pedido,
                        order_status: orderStatus
                    }
                });
               // console.log("LOS PEDIDOSS: "+pedidosStatus)

                setPedidos(pedidosStatus)
            }
        }
        useEffect(() => {
            if (isFocused && user) {
                getData();
            }


        }, [isFocused, user])

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.h1}>Mis pedidos</Text>

                <Text style={styles.h2}>Pedidos en curso</Text>
                {pedidos && user && pedidos.map((pedido, index) => {
                    
                    const inputDate = new Date(pedido.created_at);
                    const date = new Date(inputDate.getTime());

                    console.log(inputDate.getHours())

                    const year = date.getFullYear();

                    const month = ("0" + (date.getMonth() + 1)).slice(-2);
                    const day = ("0" + date.getDate()).slice(-2);
                    const hours = ("0" + date.getUTCHours()).slice(-2);
                    const minutes = ("0" + date.getMinutes()).slice(-2);
                    const seconds = ("0" + date.getSeconds()).slice(-2);

                    const time = `${hours}:${minutes}:${seconds}`;
                    const formattedDate = `${year}-${month}-${day}`;


                    if (pedido.order_status.name !== "Terminado") {
                        return (
                            <View key={index} style={styles.stateCtn}>
                                <Text style={styles.stateName}>{formattedDate} {time} / {pedido.local_uid ==="LOCAL_5B70DB7381C6C7.36833222" ?
                                    "Envio"
                                    :
                                    "Recogida en tienda"
                                } </Text>
                              
                                <Text style={styles.stateName}>{pedido.order_status.name}</Text>
                                <Text style={styles.stateInfo}>{pedido.order_status.description}</Text>
                            </View>
                        )
                    }
                })

                }
                <Text style={styles.h2}>Pedidos completados</Text>
                {
                    pedidos && user && pedidos.map((pedido, index) => {
                        const date = new Date(pedido.created_at);
                        const year = date.getFullYear();
                        const month = ("0" + (date.getMonth() + 1)).slice(-2);
                        const day = ("0" + date.getDate()).slice(-2);

                        const formattedDate = `${year}-${month}-${day}`;
                        if (pedido.order_status.name === "Terminado") {
                            return (
                                <View key={index} style={styles.stateCtn}>
                                    <Text style={styles.stateName}>{formattedDate} -{pedido.order_status.name}</Text>
                                    <Text style={styles.stateInfo}>{pedido.order_status.description}</Text>

                                </View>

                            )
                        }
                    })
                }
            </ScrollView >

        )
    }


    return (
        <>
            <TiendasStack.Navigator screenOptions={{ headerShown: true }} >
                <TiendasStack.Screen name="MisPedidosPage" component={Pedidos}
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
    h1: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 30,
        marginBottom: 20,
    },
    h2: {
        fontSize: 16,
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
    stateName: {
        fontWeight: '600',
        color: 'black',
    },
    stateInfo: {
        color: 'grey',
        marginTop: 5,
    },
    stateCtn: {
        marginVertical: 15,

    }
});
