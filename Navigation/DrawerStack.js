
import React, { useState } from "react";

import { Text } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Configuration from "../pages/FileConfiguration";
import TopBackNavigation from "../components/TopBackNabigation";


import TopBackNavigationConf from "../components/TopBackNabigationConf";

const PedidoStack = createNativeStackNavigator();


export default DrawerStack = ({ navigation }) => {

    return (
        <>

            <PedidoStack.Navigator screenOptions={{ headerShown: true }} >
                <PedidoStack.Screen name="Info" component={Info}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
                        
            </PedidoStack.Navigator>

        </>
    )
}