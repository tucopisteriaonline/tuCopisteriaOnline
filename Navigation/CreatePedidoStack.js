
import React, { useState } from "react";



import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FileConfiguration from "../pages/FileConfiguration";
import TopBackNavigation from "../components/TopBackNabigation";

import FileUnpload from "../pages/FileUnpload";
import TopBackNavigationConf from "../components/TopBackNabigationConf";

const PedidoStack = createNativeStackNavigator();


export default CreatePedidoStack = ({ navigation }) => {
    return (
        <>

            <PedidoStack.Navigator screenOptions={{ headerShown: true }} >
                <PedidoStack.Screen name="FileUnpload" component={FileUnpload}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
                <PedidoStack.Screen name="FileConfiguration"
                    component={FileConfiguration}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigationConf />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
                <PedidoStack.Screen name="Otro" component={Otro} />
            </PedidoStack.Navigator>

        </>
    )
}