import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";

export const useLogin = () => {
    const [loginError, setError] = useState();
    const [isLoading, setIsLoading] = useState();
    const { dispatch } = useAuthContext();

    const navigation = useNavigation()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        console.log(JSON.stringify({ email, password }))
        if (email && password) {
            const response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const json = await response.json()

            if (!response.ok) {
                console.log(json.error)
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                //save the use to local estoraage email + jwt
                await AsyncStorage.setItem('@user', JSON.stringify(json));

                //update auth context
                dispatch({ type: 'LOGIN', payload: json })
                setIsLoading(false)
                navigation.navigate('Home')
            }
        } else {
            setError("Introduce toda la información necesaria")
        }


    }

    return { login, isLoading, loginError }
} 