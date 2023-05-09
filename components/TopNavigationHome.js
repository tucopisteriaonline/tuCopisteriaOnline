import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import MenuIcon from "../Icons/MenuIcon";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import EntrarIcon from "../Icons/EntrarIcon";
const TopNavigationHome = ({ count }) => {
    const { user } = useAuthContext();
    const { logout } = useLogout()
    const navigation = useNavigation()


    return <View style={styles.container}>

        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} underlayColor="#f0ddcc" onPress={() => {
                navigation.openDrawer();
            }}>
                <MenuIcon color="black" size={25} />
            </TouchableOpacity>
        </View>
        {user ?
            <>
                <View>
                    
                   {/*Text>Hola, Iker</Text>
                     
                    <Text style={styles.adminText}>Perfil de administrador</Text>*/}
                    

                    <TouchableOpacity underlayColor="#f0ddcc" onPress={() => {
                        navigation.navigate("DatosDeFacturacion")
                    }}>
                        <Text style={styles.nameText}>Hola, {user.user.name}</Text>
                    </TouchableOpacity>
                </View>
            </>
            :
            <View style={styles.btnContainer}>
                <TouchableOpacity underlayColor="#f0ddcc" onPress={() => {
                    navigation.navigate("Login")
                }}>
                    <EntrarIcon color="black" size={25} />
                </TouchableOpacity>
            </View>

        }

    </View>
}

const styles = StyleSheet.create({
    adminText: {
        fontSize: 12,
    },
    nameText: {
        color: 'black',
    },
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    backButton: {
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
        marginRight: 30,
    },

})

export default TopNavigationHome
