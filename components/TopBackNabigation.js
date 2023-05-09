import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import BackIcon from "../Icons/BackIcon";
import MenuIcon from "../Icons/MenuIcon";







const TopBackNavigation = () => {

    const navigation = useNavigation()

    return <View style={styles.container}>

        <View style={styles.btnContainer}>
           <TouchableOpacity  underlayColor="#f0ddcc" onPress={() => {
                navigation.openDrawer();
            }}>
                <MenuIcon color="black" size={25} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} underlayColor="#f0ddcc" onPress={() => {
                navigation.goBack()
            }}>
                <BackIcon color="black" size={25} />
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    /*container: {
        height:30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#F9E219',
    },*/
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

      
    },
    backButton:{
        borderRadius: 5,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    precio: {
        color: "black",
        marginRight:30,
    }
})

export default TopBackNavigation
