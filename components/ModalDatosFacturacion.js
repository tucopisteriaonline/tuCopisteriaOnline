import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import CloseIcon from "../../Icons/CloseIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ModalDatosFacturacion(

    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        setDatosFacturacion
    }) {

    const [isLoading, setIsLoading] = useState();
    const [direcciones, setDirecciones] = useState('');

    useEffect(() => {
        getDatosFacturacion()
    }, [])
    const handlePress = (direccion) => {
        setDatosFacturacion(direccion)
        onClose();

    }

    const getDatosFacturacion = async () => {
        setIsLoading(true)
        try {
            const jsonValue = JSON.parse(await AsyncStorage.getItem('@DatosDeFacturacion'));
            if (jsonValue && jsonValue != '') {
                setDirecciones(jsonValue)
            }
            setDatosFacturacion(jsonValue[0])
            setIsLoading(false)
        } catch (e) {
            // error reading value
            setIsLoading(false)
        }

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
                    width: '90%',
                    backgroundColor: '#fff',
                }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 15,
                    }}>
                        <View style={{
                            alignItems: 'center',
                        }}>

                            <Text style={styles.titulo}>Selecciona los Datos </Text>
                        </View>
                        <View style={{


                            alignItems: 'center',

                        }}>
                            <TouchableOpacity onPress={onClose}>
                                <CloseIcon size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <ScrollView style={{ marginBottom: 15 }}>
                        {direcciones && direcciones.map((item, index) => {

                            return (
                                <View key={index} style={styles.ctnLocal}>
                                    <TouchableOpacity

                                        onPress={() => handlePress(item)}>
                                        <Text style={styles.localText}>
                                        {item.name}  {(item.nif).toUpperCase()}  
                                        </Text>
                                        <Text style={styles.localText}>
                                        {item.city}, {item.postal_code} {item.province}
                                        </Text>

                                    </TouchableOpacity>
                                </View>
                            )


                        })

                        }
                    </ScrollView>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    ctnLocal: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',


    },
    localText: {
        color: 'black',
        fontSize: 14,
    },
    titulo: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    }
});