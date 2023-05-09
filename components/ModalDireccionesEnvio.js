import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import CloseIcon from "../Icons/CloseIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Btn01 from "./Btn01";
import { useNavigation ,CommonActions} from "@react-navigation/native";

export default function ModalDireccionesEnvio(

    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        setDireccion
    }) {
        const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState();
    const [direcciones, setDirecciones] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDirecciones();
          });
      
          // Return a cleanup function to remove the listener when the component unmounts
        return unsubscribe;
      
    }, [navigation])

    const handlePress = (direccion) => {
        setDireccion(direccion)
        onClose();
    }
    const createNew= async()=>{
        await navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Compra' },
                ],
            })
        );
        navigation.navigate("DireccionesDeEnvio")
        onClose();
    }

    const getDirecciones = async () => {
        setIsLoading(true)
        try {
            const jsonValue = JSON.parse(await AsyncStorage.getItem('@DireccionesDeEnvio'));
            console.log("DAOS ENVIO  " + JSON.stringify(jsonValue));
            if (jsonValue && jsonValue != '') {
                setDirecciones(jsonValue)
                setDireccion(jsonValue[0])
            }
            
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

                            <Text style={styles.titulo}>Selecciona una  Direccion</Text>
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
                                            {item.city}, {item.postal_code} {item.province}
                                        </Text>
                                        <Text style={styles.localText}>
                                            {item.address}
                                        </Text>

                                    </TouchableOpacity>
                                </View>
                            )


                        })

                        }
                        <View style={styles.btnCtn}>
                            <Btn01 title="Añadir" onPress={() => createNew()} />

                        </View>
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
    },
    btnCtn:{
        padding:10,
    }
});