import React from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text } from 'react-native';
import CloseIcon from "../Icons/CloseIcon";
import Pdf from "react-native-pdf";

export default function CustomModal(
    { onDismiss = () => null,
        onShow = () => null,
        visible,
        onClose,
        data }) {

    const url = decodeURI(data.fileCopyUri);
    const source = { uri: url, cache: false };
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
                    height: '80%',
                    width: '90%',
                    backgroundColor: '#fff',
                }}>
                    <View style={{
                        height: 45,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        <TouchableOpacity onPress={onClose}>
                            <CloseIcon size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    {!source ? <Text>Loading</Text> :
                        <View style={styles.pdfCtn} >
                            <Pdf
                                fitWidth={true}
                                source={source}
                                singlePage={true}
                                style={styles.pdf}
                            />
                        </View>
                    }

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    pdfCtn: {
        flex: 1,
    },
});