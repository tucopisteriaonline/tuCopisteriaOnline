import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking, SafeAreaView, ActivityIndicator } from "react-native";
import TopBackNabigation from "../components/TopBackNabigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopBackNavigation from "../components/TopBackNabigation";
import MapsIcon from "../Icons/MapsIcon";
import { API_URL } from "../config"

export default Tiendas = ({ navigation }) => {
    const TiendasStack = createNativeStackNavigator();
    const TiendaFisicas = () => {
        const [isloading, setIsLoading] = useState(true);
        const [locals, setLocals] = useState();

        const getLocales = async () => {
            setIsLoading(true)
            const url = `${API_URL}/locals`
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                console.log(response.error)
            }
            if (response.ok) {
                setLocals(json)
                setIsLoading(false)

            }
        }
        useEffect(() => {
            getLocales();
        }, [])

        const goLink = (data) => {

            const url = Platform.select({
                ios: `http://maps.apple.com/?q=${encodeURIComponent(data)}`,
                android: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data)}`,
              });

            Linking.openURL(url);

        }
        if (!isloading) {
            return (
                <ScrollView style={styles.container}>
                    <Text style={styles.h1}>Tiendas Físicas</Text>
                    <Text style={styles.p}>¿ Quieres imprimir en una de nuestras tiendas físicas o recoger un pedido realizado por la web ? Aquí es donde nos puedes encontrar</Text>
                    {locals &&
                        locals.map((tienda, index) => {
                            if (tienda.id !== 1) {
                                return (
                                    <View style={styles.tienda} key={index}>
                                        <View style={styles.ctnInfo}>
                                            <Text style={styles.nombre}>{tienda.descripcion}</Text>
                                            <Text style={styles.direccion}>{tienda.address}</Text>
                                            <Text style={styles.tel}>Tfno. {tienda.phone}</Text>
                                        </View>
                                        <View style={styles.cardShadow}>
                                            <TouchableOpacity style={styles.ctnLink} onPress={() => goLink(tienda.address)}>
                                                <MapsIcon />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }

                        })
                    }
                </ScrollView>
            )
        } else {
            return (<SafeAreaView style={styles.containerDefault}>
                <ActivityIndicator size="large" color="#464644" />
            </SafeAreaView>)
        }

    }



    return (
        <>
            <TiendasStack.Navigator screenOptions={{ headerShown: true }} >
                <TiendasStack.Screen name="Info" component={TiendaFisicas}
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
        marginBottom: 10,
    },
    p: {
        textAlign: 'center',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 100,
         backgroundColor:'white',
    },
    tienda: {
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
