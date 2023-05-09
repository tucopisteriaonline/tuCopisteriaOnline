import React, { useState } from "react";
import { Text, StyleSheet, View, Button, SafeAreaView, Image, Dimensions, Linking, Modal, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";

import Button1 from "../components/Button";
import MisPedidos from "../components/MisPedidos";


import SuccesAlert from "../components/Alerts/SuccesAlert";
import ErrorAlert from "../components/Alerts/ErrorAler";
const { width } = Dimensions.get("window")
export default Home = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.banner1}>
                    <Image
                        source={require('../assets/images/imagen1.jpg')}
                        style={{ width: width, height: '100%' }}
                        resizeMode="stretch"
                    />

                </View>
                <View style={styles.conatainerCentro}>
                    <View style={styles.btContainer}>
                        <Button1 style={styles.btn} title="Nuevo pedido" onPress={() => navigation.navigate('CreatePedidoStack')} />
                        <Button1 style={styles.btn} title="Crear Presupuesto" onPress={() => navigation.navigate('CreatePedidoStack')} />
                    </View>
                </View>

                <View style={styles.banner2}>
                    <ScrollView pagingEnabled horizontal style={styles.carousel}>
                        <Image
                            source={require('../assets/images/carousel01.jpg')}
                            style={{ width: width, height: '100%' }}
                            resizeMode="stretch"
                        />
                        <Image
                            source={require('../assets/images/carousel02.jpg')}
                            style={{ width: width, height: '100%' }}
                            resizeMode="stretch"
                        />
                        <Image
                            source={require('../assets/images/carousel03.jpg')}
                            style={{ width: width, height: '100%' }}
                            resizeMode="stretch"
                        />
                        <Image
                            source={require('../assets/images/carousel04.jpg')}
                            style={{ width: width, height: '100%' }}
                            resizeMode="stretch"
                        />
                    </ScrollView>
                </View>
                <View style={styles.misPedidos}>
                    <MisPedidos />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',

    },
    btContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btn: {
        padding: 15,
    },
    banner1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        //backgroundColor: 'red',
    },
    banner2: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    conatainerCentro: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 15,
    },
    misPedidos: {
        width: '100%',
        height: 140,
        backgroundColor: 'white',
    },
    carousel: {
        width: width,
        height: '100%',
        backgroundColor: 'white',

    }

});

