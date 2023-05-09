
import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawNavigation from "./DrawNavigation";
import Otro from "../pages/Otro";
import FileConfigurationEdit from "../pages/FileConfigurationEdit";
import TopBackNavigationConf from "../components/TopBackNabigationConf";
const HomeStack = createNativeStackNavigator();
import Register from '../pages/userPages/Register';
import Login from '../pages/userPages/Login';
import EditUser from "../pages/userPages/EditUser"
import MisPedidos from "../pages/userPages/MisPedidos";
import { DatosDeFacturacion } from "../pages/DatosDeFacturacion";
import { DireccionesDeEnvio } from "../pages/DireccionesDeEnvio";


export default StackNavigation = ({ navigation }) => {
    return (
        <>

            <HomeStack.Navigator screenOptions={{ headerShown: false }} >
                <HomeStack.Screen name="DrawNavigation" component={DrawNavigation} />
                <HomeStack.Screen name="Otro" component={Otro} />
                <HomeStack.Screen name="FileEdit" component={FileConfigurationEdit}
                    options={({ route }) => (
                        {
                            headerTitle: () => <TopBackNavigationConf />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
                        })} />
                <HomeStack.Screen name="Login" component={Login} />
                <HomeStack.Screen name="Register" component={Register} />
                <HomeStack.Screen name="EditarUsuario" component={EditUser} />
                <HomeStack.Screen name="DireccionesDeEnvio2" component={DireccionesDeEnvio} />
                <HomeStack.Screen name="DatosDeFacturacion2" component={DatosDeFacturacion} />

            </HomeStack.Navigator>


        </>
    )
}
