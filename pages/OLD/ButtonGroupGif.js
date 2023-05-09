import React, { useState, onChange } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

import gif1 from '../../assets/images/gifSmall/1-VLLG.gif'
import gif2 from '../../assets/images/gifSmall/2-HLCG.gif'
import gif3 from '../../assets/images/gifSmall/3-HLLG.gif'


export const ButtonGroupGif = ({ change, configuracion }) => {

    const buttons = ["VV", "HV", "HH"];
    const gifs = [gif1, gif2, gif3];

    return (
        buttons.map((value, index) => {
            return (
                <TouchableOpacity key={index}
                    style={{
                        ...styles.button,
                        backgroundColor: configuracion.orientacion === `${value}` ? "#FDE619" : "#DBDBDB"
                    }}
                    value={value}
                    onPress={() => change(value, "orientacion")}
                >
                    <Image
                        source={gifs[index]}
                        style={{ width: 60, height: 50 }}
                    />
                </TouchableOpacity>
            );
        })
    );
}


const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        borderRadius: 3,
        flex: 1,
        alignItems: 'center',
    },
});
