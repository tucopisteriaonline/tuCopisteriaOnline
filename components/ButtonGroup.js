import React, { useState, onChange } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export const ButtonGroup = (props) => {
    const idDefault = props.default;
    //console.log(idDefault);
    const [clickedId, setClickedId] = useState(idDefault);
    const handleClick = (item, id) => {
        setClickedId(id);
    }
    const buttons = props.buttons
    
    return (
        buttons.map((buttonLabel, index) => {
            return (
                    <TouchableOpacity
               
                        onPress={(item) => handleClick(item, index) + props.onChange(buttonLabel)}
                        key={index}
                        style={[
                            index === clickedId ? styles.buttonActive : styles.button
                        ]}
                        activeOpacity={1}
                    >
                        <Text style={styles.btnText}>
                            {buttonLabel}
                        </Text>
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
    btnText:{
        fontSize:14,
        fontWeight:'500',
        color:'black',
    }
   
});
