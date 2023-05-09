import React, { useState, onChange } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import MyButton from "./myButton";
import { FilePreview } from "../../components/FilePreview";

export const PaginasPorCara = ({ url, change, configuracion }) => {


    const source = { uri: url, cache: true };
    return (
        <>
            <View style={styles.container}>
            
                <View style={styles.ctnPreview}>
                    <FilePreview source={source} id={configuracion.finisher_slisdeshow} />
                </View>

                <View style={styles.ctnOpciones}>
                    < Text style={styles.label}>Multiples por cara</Text>
                    <MyButton
                        change={change}
                        configuracion={configuracion}
                        opt={"finisher_slisdeshow"}
                        value={"Normal"}
                        style={styles.button}


                    />
                    <MyButton
                        change={change}
                        configuracion={configuracion}
                        opt={"finisher_slisdeshow"}
                        value={"2/Vertical"}
                    />

                    <MyButton
                        change={change}
                        configuracion={configuracion}
                        opt={"finisher_slisdeshow"}
                        value={"2/Horizontal"}
                    />
                    <MyButton
                        change={change}
                        configuracion={configuracion}
                        opt={"finisher_slisdeshow"}
                        value={"4/Horizontal"}
                    />
                </View>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    buttonActive: {
        paddingVertical: 8,
        backgroundColor: '#FDE619',
        margin: 7,

        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    button: {
        paddingVertical: 8,
        backgroundColor: '#DBDBDB',
        margin: 7,

        flex: 1,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    ctnPreview: {
        flex: 1,
        display: 'flex',
        width: '50%',
        backgroundColor: '#DBDBDB',
        flexWrap: 'wrap',
        marginHorizontal: 20,
    },
    ctnOpciones: {
        width: '50%',
    },
    label: {
        fontWeight: '600',
        color: 'black',
        alignSelf: 'center',
        paddingVertical: 8,
    },


});
