import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Pressable, TouchableOpacity, Text, ViewBase } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useAuthContext } from "../hooks/useAuthContext";
import { API_URL } from "../config";

export default function MisPedidos({ title, onPress }) {
    const navigation = useNavigation();
    const { user } = useAuthContext();

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

            const countByType = {};
            pedidosStatus.forEach((pedido) => {
                if (pedido.order_status_uid === "OSTATE5B7E1287EFB767.95163695" || pedido.order_status_uid === "OSTATE5B6F6BAFC72D61.52335275") {
                    if (pedido.order_status_uid === "OSTATE5B7E1287EFB767.95163695") {
                        if (countByType["Terminados"]) {
                            countByType["Terminados"]++;
                        } else {
                            countByType["Terminados"] = 1;
                        }
                    }
                    if (pedido.order_status_uid === "OSTATE5B6F6BAFC72D61.52335275") {
                        if (countByType["Pendientes"]) {
                            countByType["Pendientes"]++;
                        } else {
                            countByType["Pendientes"] = 1;
                        }
                    }
                } else {
                    if (countByType["EnProceso"]) {
                        countByType["EnProceso"]++;
                    } else {
                        countByType["EnProceso"] = 1;
                    }
                }



            });

            setPedidos(countByType)
        }
    }
    useEffect(() => {
        if (user) {
            getData();
        }

    }, [user])

    if (user && pedidos) {
        return (
            < View style={styles.mainCtn}>
                <Text style={styles.titulo}>Mis pedidos</Text>
                <View style={styles.ctnInfo}>
                    <TouchableOpacity onPress={() => navigation.navigate("MisPedidos")} style={styles.pedidoCtn}>
                        <Text style={styles.num}>{pedidos.Pendientes ? pedidos.Pendientes : 0}</Text>
                        <Text style={styles.text}>Pedidos  </Text>
                        <Text style={styles.text}>pendientes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("MisPedidos")} style={styles.pedidoCtn}>
                        <Text style={styles.num}>{pedidos.EnProceso ? pedidos.EnProceso : 0}</Text>
                        <Text style={styles.text}>Pedidos  </Text>
                        <Text style={styles.text}>en proceso</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate("MisPedidos")} style={styles.pedidoCtn}>
                        <Text style={styles.num}>{pedidos.Terminados ? pedidos.Terminados : 0}</Text>
                        <Text style={styles.text}>Pedidos  </Text>
                        <Text style={styles.text}>completados</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }else{
        return(
            < View style={styles.mainCtn}>
            <Text style={styles.titulo}>Mis pedidos</Text>
            <View style={styles.ctnInfo}>
                <TouchableOpacity onPress={() => navigation.navigate("MisPedidos")} style={styles.pedidoCtn}>
                    <Text style={styles.num}>0</Text>
                    <Text style={styles.text}>Pedidos  </Text>
                    <Text style={styles.text}>pendientes</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("MisPedidos")} style={styles.pedidoCtn}>
                    <Text style={styles.num}>0</Text>
                    <Text style={styles.text}>Pedidos  </Text>
                    <Text style={styles.text}>en proceso</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate("MisPedidos")} style={styles.pedidoCtn}>
                    <Text style={styles.num}>0</Text>
                    <Text style={styles.text}>Pedidos  </Text>
                    <Text style={styles.text}>completados</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    mainCtn: {
        padding: 10,
        backgroundColor: 'white',
    },
    titulo: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        marginBottom: 10,
    },
    ctnInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pedidoCtn: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    num: {
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
        backgroundColor: '#FDE619',
        paddingHorizontal: 30,
        paddingVertical: 4,
        borderRadius: 25,
    },
    text: {
        color: 'black',
    }
});