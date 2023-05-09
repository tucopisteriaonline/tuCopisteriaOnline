import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { color } from "react-native-reanimated";
import Btn1 from "../components/Btn01";
import { useNavigation } from "@react-navigation/native";


export default Info = () => {
    const navigation = useNavigation();
    return (

        <>


            <View style={{ flex: 1}}>
                <ScrollView style={styles.container}>
                    <Text style={styles.titulo}>
                        Encuadernación ¡GRATIS!
                    </Text>
                    <Text style={styles.parrafo}>
                        Realizamos encuadernaciones gratuitas cuando se sobrepasan las 80 impresiones. Subiendo mas de un archivo en un mismo articulo de compra podrás encuadernar los documentos de manera conjunta o no, tu eliges. Podrás decidir entre encuadernar por el lado corto o por el lado largo.
                    </Text>

                    <Text style={styles.titulo}>
                        ¡ Precios increíbles !
                    </Text>
                    <Text style={styles.parrafo}>
                        Siempre 'low-cost'. Impresiones B/N 0,025€ y Color 0,09€ Los precios mas bajos con la mejor calidad de impresión.
                    </Text>

                    <Text style={styles.titulo}>
                        Envíos a domicilio ¡GRATIS!
                    </Text>
                    <Text style={styles.parrafo}>
                        Recibe tus pedidos en tu domicilio en tiempo récord.Realizamos envíos a domicilio gratuitos a partir de 49€. Los envios se realizan únicamente para la península
                    </Text>
                    <View style={{ marginTop: 30 }}>
                        <Btn1 title={"Crear Presupuesto"} onPress={() => navigation.navigate("CreatePedidoStack")} />
                    </View>

                    <Text style={styles.titulo}>
                        Objetivos
                    </Text>
                    <Text style={styles.parrafo}>
                        Nuestra copistería  tiene como objetivo hacer el proceso de impresión lo mas fácil y rápido posible, guardando la calidad excelente de impresión al mejor precio del mercado.
                    </Text>

                </ScrollView >
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        flexGrow: 1,
        paddingBottom: 300,

    },
    titulo: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        marginVertical: 15,


    },
    parrafo: {
        fontSize: 16,
        color: 'black',
        marginBottom: 15,
    }


});
