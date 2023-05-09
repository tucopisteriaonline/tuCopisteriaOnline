import React, { useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import ModalLocales from "../components/ModalLocales";
export default FormaDeEntrega = ({ navigation }) => {
    const [modalView, setModalView] = useState(false);
    const local = () => {
        setModalView(true)
        // navigation.navigate('ResumenPedido',{ 'pedido': "Local" })
    }



    return (

        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} title="A Domicilo" onPress={() => navigation.navigate('ResumenPedido', { 'pedido': "Envio" ,'local': {"uid":"LOCAL_5B70DB7381C6C7.36833222" } })} >
                    <Text style={styles.text}>A Domicilo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} title="Recogida en local" onPress={() => local()} >
                    <Text style={styles.text}>Recogida en local</Text>
                </TouchableOpacity>
            </View>
            <ModalLocales
                visible={modalView}
                onClose={() => setModalView(false)}
                navigation={navigation}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        backgroundColor: '#FDE619',
        minWidth: 300,
        alignItems: 'center',
        margin: 5,
        paddingVertical: 15,
        borderRadius: 7,
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    }

});
