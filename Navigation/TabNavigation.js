import React, { useEffect, useState, useContext } from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopNavigationHome from "../components/TopNavigationHome";
import Home from "../pages/Home";
const Tab = createBottomTabNavigator();
import Info from "../pages/Info";
import Carrito from "../pages/Carrito";
import HomeIcon from "../Icons/HomeIcon";
import { color } from "react-native-reanimated";
import HelpIcon from "../Icons/HelpIcon";
import CartIcon from "../Icons/CartIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimultaneousGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition";
import CarritoStack from "./CarritoStack";
import { useCarritoState } from "../hooks/useCarritoState";
import { CarritoContext } from "../App";

export default TabNavigation = ({ navigation }) => {

    const [carritoState, setCarritoState] = useContext(CarritoContext);
    console.log(carritoState)
    useEffect(() => {
        navigation.setOptions({
            tabBarBadge: carritoState > 0 ? carritoState : null,
        });
    }, [])

    return (
        <>
            <Tab.Navigator screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#FDE619',
                tabBarStyle: {
                    backgroundColor: 'black',
                }
            }}>
                <Tab.Screen name="Home" component={Home}

                    options={({ route }) => (
                        {
                            tabBarIcon: ({ color, size }) => (
                                <HomeIcon color={color} size={size} />
                            ),

                            headerTitle: () => <TopNavigationHome />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })}

                />
                <Tab.Screen name="Info" component={Info} options={({ route }) => (
                    {
                        tabBarIcon: ({ color, size }) => (
                            <HelpIcon color={color} size={size} />
                        ),
                        headerTitle: () => <TopNavigationHome />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                    })} />

                <Tab.Screen name="Carrito"
                    component={Carrito}
                    options={({ route }) => (
                        {
                            tabBarBadge: carritoState > 0 ? carritoState : null,
                            tabBarIcon: ({ color, size }) => (
                                <CartIcon color={color} size={size} />
                            ),
                            headerTitle: () => <TopNavigationHome />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
            </Tab.Navigator>

        </>
    )
}

