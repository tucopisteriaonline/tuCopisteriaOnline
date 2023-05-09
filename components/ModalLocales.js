import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "../config";
import CloseIcon from "../Icons/CloseIcon";


export default function ModalLocales(

    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        navigation
    }) {

    const [isLoading, setIsLoading] = useState();
    const [locals, setLocals] = useState('');

    useEffect(() => {
        getLocales()
    }, [])
    const handlePress = (local) => {
        onClose();
        navigation.navigate('ResumenPedido', { 'pedido': "Local", 'local': { ...local } })
    }

    const getLocales = async () => {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/locals`, {
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

                            <Text style={styles.titulo}>Selecciona un local</Text>
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

                        {locals && locals.map((item, index) => {
                            if (index != 0) {
                                return (
                                    <View key={item.id} style={styles.ctnLocal}>
                                        <TouchableOpacity

                                            onPress={() => handlePress(item)}>
                                            <Text style={styles.localText}>
                                                {item.descripcion}
                                            </Text>
                                            <Text style={styles.localText} >
                                                {item.address}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }

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