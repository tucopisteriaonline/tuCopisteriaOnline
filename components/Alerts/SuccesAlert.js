import { Text, StyleSheet, View, Image, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import CheckIcon from "../../Icons/CheckIcon";
import CloseIcon from "../../Icons/CloseIcon";


import { useNavigation, CommonActions } from "@react-navigation/native";

export default function SuccesAlert() {
    const [modalVisible, setModalVisible] = useState(true);
    const navigation = useNavigation();

    const closeModal = ()=>{
        setModalVisible(false)
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            }),
            navigation.navigate('MisPedidos')
        );
    }
    return (
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={{
                height: 45,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 10,
            }}>

            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

                <View style={{ backgroundColor: 'white', padding: 15, width: 300 }}>
                    <TouchableOpacity
                        style={{
                            height: 45,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginBottom: 10,


                        }}
                        onPress={() => closeModal()}>
                        <CloseIcon size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, color: 'green', textAlign: "center" }}>Pedido realizado correctamente !</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                        <CheckIcon size={150} color={'green'} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({


});