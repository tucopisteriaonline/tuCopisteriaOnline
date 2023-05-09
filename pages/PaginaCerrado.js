import React, { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, PermissionsAndroid } from "react-native";
import CloudOff from "../Icons/CloudOff";
export default PaginaCerrado = ({ mensaje }) => {
    return (

        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.icon}>
                    <CloudOff size={90} color={"red"} />
                </View>

                <Text style={styles.titulo}>Lo sentimos, no podemos conectarnos al servidor en este momento. Por favor, comprueba tu conexión a internet e inténtalo de nuevo más tarde.</Text>
                <Text style={styles.mensaje}>{mensaje ? mensaje : ""}</Text>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    icon:{
        margin:25,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    mensaje: {
        marginTop: 25,
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
    }

});
