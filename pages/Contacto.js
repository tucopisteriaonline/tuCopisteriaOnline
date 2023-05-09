import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking, Image } from "react-native";
import TopBackNavigation from "../components/TopBackNabigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WhatsAppIcon from "../Icons/WhatsAppIcon";
import EmailIcon from "../Icons/EmaiIcon";

export default  Contacto = () => {
    const ContactoStack = createNativeStackNavigator();

    const ContactoInfo = () => {
        const WhatsAppLink = () => {
            const url = `whatsapp://send?phone=690952360`
            Linking.openURL(url)
        }
        const EmailLink = () => {
            const url = 'mailto:contacto.tucopisterionline@gmail.com?subject=testing'
            Linking.openURL(url);
        }
        return (
            <>
                <ScrollView style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Contacto</Text>
                    </View>
                    <View style={styles.contacto} >
                        <View style={styles.ctnInfo}>
                            <Text style={styles.nombre}>WhatsApp</Text>
                            <Text style={styles.direccion}>WhatsApp +34 690952360</Text>
                        </View>
                        <View style={styles.cardShadow}>
                            <TouchableOpacity style={styles.ctnLink} onPress={() => WhatsAppLink} >
                                <WhatsAppIcon width={40} height={40} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.contacto} >
                        <View style={styles.ctnInfo}>
                            <Text style={styles.nombre}>Email</Text>
                            <Text style={styles.direccion}>contacto.tucopisterionline@gmail.com</Text>
                        </View>
                        <View style={styles.cardShadow}>
                            <TouchableOpacity style={styles.ctnLink} onPress={() => EmailLink()} >
                                <EmailIcon width={40} height={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.imgCtn}>
                    <Image
                        source={require('../assets/images/kit.png')}
                        style={{width:"100%",height: 30 }}
                        resizeMode="stretch"
                    />
                </View>
            </>
        )
    }



    return (
        <>
            <ContactoStack.Navigator screenOptions={{ headerShown: true }} >
                <ContactoStack.Screen name="ContactoScreen" component={ContactoInfo}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
            </ContactoStack.Navigator>
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
        marginBottom: 10,
    },
    p: {
        textAlign: 'center',
        marginBottom: 20,
    },
    imgCtn:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 100,
        backgroundColor: 'white',
    },
    contacto: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        //backgroundColor: 'red',
    },
    ctnInfo: {
        flex: 1,
        margin: 5,
    },
    nombre: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    tel: {
        color: 'black',
        fontSize: 14,
    },
    direccion: {
        color: 'black',
        fontSize: 14,
        marginBottom: 8,
    },
    ctnLink: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 80,
        height: 80,
        borderRadius: 100 / 2,
        backgroundColor: 'white',

        borderRadius: 50, // half the width and height of the component
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    cardShadow: {
        borderRadius: 100 / 2,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 7,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    }

});
