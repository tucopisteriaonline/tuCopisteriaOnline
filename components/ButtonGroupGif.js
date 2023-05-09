import React, { useState, onChange } from "react";
import { StyleSheet, View, TouchableOpacity, Text ,Image } from "react-native";
import gif1 from '../assets/images/gif/1-VLLG.gif'
import gif2 from '../assets/images/gif/2-HLCG.gif'
import gif3 from '../assets/images/gif/3-HLLG.gif'


export const ButtonGroupGif = (props) => {
    const idDefault = props.default;
    const [clickedId, setClickedId] = useState(idDefault);
    const handleClick = (item, id) => {
        setClickedId(id);
    }
    const buttons = ["VV","HV","HH"];
    const gifs = [gif1,gif2,gif3];
    return (
        buttons.map((buttonLabel, index) => {
            return (
                <TouchableOpacity
                    onPress={(item) => handleClick(item, index) + props.onChange(buttonLabel)}
                    key={index}
                    style={[
                        index === clickedId ? styles.buttonActive : styles.button
                    ]}
                >
                    <Image
                        source={gifs[index]}
                        style={{ width:60, height: 50 }}
                    />
                </TouchableOpacity>
            );
        })
    );
}

const styles = StyleSheet.create({
    buttonActive: {
        paddingVertical: 8,
        backgroundColor: '#FDE619',
        borderRadius: 3,

        flex:1,
        alignItems:'center',
    },
    button: {
        paddingVertical: 8,
        backgroundColor: '#DBDBDB',
        borderRadius: 3,
       
        flex:1,
        alignItems:'center',
    },
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    }

});
