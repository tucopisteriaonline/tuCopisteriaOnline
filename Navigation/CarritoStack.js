
import React, { useState } from "react";



import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TopBackNavigation from "../components/TopBackNabigation";

import FileUnpload from "../pages/FileUnpload";
import TopBackNavigationConf from "../components/TopBackNabigationConf";
import Carrito from "../pages/Carrito";
import FormaDeEntrega from "../pages/FormaDeEntrega";
import ResumenPedido from "../pages/ResumenPedido";
import FileConfigurationEdit from "../pages/FileConfigurationEdit";
import PaginaDePago from "../pages/PaginaDePago";
import TopBackNavigationPago from "../components/TopBackNavigationPago";
const PedidoStack = createNativeStackNavigator();


export default CarritoStack = ({ navigation }) => {
    return (
        <>

            <PedidoStack.Navigator screenOptions={{ headerShown: true }} >
                <PedidoStack.Screen name="FormaDeEntrega"
                    component={FormaDeEntrega}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />

                <PedidoStack.Screen name="ResumenPedido"
                    component={ResumenPedido}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />

                <PedidoStack.Screen name="PaginaDePago"
                    component={PaginaDePago}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigationPago />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />

                <PedidoStack.Screen name="FileConfigurationEdit"
                    component={FileConfigurationEdit}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigationConf />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
            </PedidoStack.Navigator>

        </>
    )
}