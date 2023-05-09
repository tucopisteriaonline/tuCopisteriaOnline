import React, { useState, onChange } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

import { FilePreview } from "./FilePreview";

export const PaginasPorCara = (props) => {
    const idDefault = props.default;
    const url = props.url;
    //console.log("iddefault____"+idDefault)
    const source = { uri: url, cache: true };

    const [clickedId, setClickedId] = useState(idDefault);
    const handleClick = (item, id) => {
        setClickedId(id);
    }
    const buttons = ["Normal"," 2/Vertical" , "2/Horizontal","4/Horizontal"];
    return (
        <>
            <View style={styles.container}>
                <View style={styles.ctnPreview}>
                 
                  <FilePreview source={source} id={clickedId}/>
                </View>
                
                <View style={styles.ctnOpciones}>
                    < Text style={styles.label}>Multiples por cara</Text>
                    {
                        buttons.map((buttonLabel, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={(item) => handleClick(item, index) + props.onChange(buttonLabel)}
                                    key={index}
                                    style={[
                                        index === clickedId ? styles.buttonActive : styles.button
                                    ]}
                                >
                                    <Text style={styles.btnText}>
                                        {buttonLabel}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
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
        display:'flex',
        width: '50%',
        backgroundColor: 'grey',
        flexWrap:'wrap',
        //height: 250,
        
    },
    ctnOpciones: {
        flex: 1,
        width: '50%',
       
    },
    label: {
        fontWeight: '600',
        color: 'black',
        alignSelf: 'center',
        paddingVertical: 8,
    },


});
