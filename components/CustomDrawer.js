import React, { useState } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity, Modal, Button, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigation,CommonActions,DrawerActions } from "@react-navigation/native";
import BackIcon from "../Icons/BackIcon";

export const CustomDrawer = (props) => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [option, setOption] = useState("Home");

    const navigation = useNavigation();
    const handleLogOut = () => {
        logout();
        setOption("Home")
        navigation.dispatch(DrawerActions.closeDrawer());
    
    }
    const handleLogin = () => {
        setOption("Home")
        navigation.navigate('Login')
        navigation.dispatch(DrawerActions.closeDrawer());
    }
    const customNavigate = (value) => {
        setOption("Home")
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            })
        );


        navigation.navigate(value)
        navigation.dispatch(DrawerActions.closeDrawer());
    }

    return (
        <DrawerContentScrollView {...props}>
            {option === "Home" ?
                <>
                    <DrawerItem
                        label="Home"
                        onPress={() => customNavigate("Home")}
                    />
                    <DrawerItem
                        label="Info"
                        onPress={() => customNavigate("Info")}

                    />
                    <DrawerItem
                        label="Crear Pedido"
                        onPress={() => customNavigate("CreatePedidoStack")}

                    />
                    <DrawerItem
                        label="Carrito"
                        onPress={() => customNavigate("Carrito")}

                    />
                    <DrawerItem
                        label="Tiendas"
                        onPress={() => customNavigate("Tiendas")}

                    />
                      <DrawerItem
                        label="Contacto"
                        onPress={() => customNavigate("Contacto")}

                    />
                </>
                : <></>}



            {option === "Home" && user ?
                <>
                 <DrawerItem
                        label="Mis Pedidos"
                        onPress={() => customNavigate("MisPedidos")}

                    />
                    <DrawerItem
                        label="Mis Datos"
                        onPress={() => setOption("MisDatos")}

                    />
                </>
                :option === "MisDatos" && user?
                <>
                    <DrawerItem
                        icon={() => <BackIcon size={25} color={"black"} />}
                        label=""
                        onPress={() => setOption("Home")}
                    />
                    <DrawerItem
                        label="Mis Datos de Facturacion"
                        onPress={() => customNavigate("DatosDeFacturacion")}

                    />
                    <DrawerItem
                        label="Mis Direcciones de Envio"
                        onPress={() => customNavigate("DireccionesDeEnvio")}

                    />
                    <DrawerItem
                        label="Metodos de pago"
                        onPress={() => customNavigate("MetodoDePago")}

                    />
                </>
                :<></>
            }


            {option === "Home" && user ?
                <>
                    <TouchableOpacity style={styles.cunstomBtn} onPress={() => handleLogOut()}>
                        <Text style={styles.cunstomBtnText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </>
                :option === "Home" && !user ?
                <TouchableOpacity style={styles.cunstomBtn} onPress={() => handleLogin()}>
                    <Text style={styles.cunstomBtnText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                :<></>
            }

        </DrawerContentScrollView>
    )
}




const styles = StyleSheet.create({
    cunstomBtn: {
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 7,
        borderRadius: 5,
    },
    cunstomBtnText: {
        color: 'black',
        fontWeight: '500'
    }
});