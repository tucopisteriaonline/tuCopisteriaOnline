
import React, { useState } from "react";

import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from "./TabNavigation";
import Info from "../pages/Info";
import CreatePedidoStack from "./CreatePedidoStack";
import DrawerStack from "./DrawerStack";
import CarritoStack from "./CarritoStack";
const Drawer = createDrawerNavigator();

import Home from "../pages/Home";
import { CustomDrawer } from "../components/CustomDrawer";
import Tiendas from "../pages/Tiendas";
import MisPedidos from "../pages/userPages/MisPedidos";
import EditUser from "../pages/userPages/EditUser";
import TopBackNavigation from "../components/TopBackNabigation";
import { useAuthContext } from "../hooks/useAuthContext";
import { DatosDeFacturacion } from "../pages/DatosDeFacturacion";
import { MetodosDePago } from "../pages/MetodosDePago";
import Contacto  from "../pages/Contacto";
import { DireccionesDeEnvio } from "../pages/DireccionesDeEnvio";

export default DrawerNavigation = ({ navigation }) => {

    const { user } = useAuthContext();
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="TabNavigation" component={TabNavigation} />
            <Drawer.Screen name="InfoStack"
                component={DrawerStack} />
            <Drawer.Screen name="CreatePedidoStack" options={{ title: 'Crear Pedido' }} component={CreatePedidoStack} />
            <Drawer.Screen name="Compra" options={{ title: 'Crear Compra' }} component={CarritoStack} />
            <Drawer.Screen name="Tiendas" component={Tiendas} />
            <Drawer.Screen name="MisPedidos" component={MisPedidos} />
            <Drawer.Screen name="DatosDeFacturacion" component={DatosDeFacturacion} />
            <Drawer.Screen name="DireccionesDeEnvio" component={DireccionesDeEnvio} />
            <Drawer.Screen name="MetodoDePago" component={MetodosDePago} />
            <Drawer.Screen name="Contacto" component={Contacto} />
        </Drawer.Navigator>

    );
}


