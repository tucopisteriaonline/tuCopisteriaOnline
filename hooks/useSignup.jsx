import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../config";
export const useSignup = ()=>{
    const[error,setError] = useState();
    const[isLoading,setIsLoading] = useState();
    const {dispatch} = useAuthContext();
    const navigation = useNavigation()

    const signup = async (email,password,name,surname,nif,phone,city,province,postalCode,address,addressSpecific) =>{
        if(email&& password && name){
            setIsLoading(true)
            setError(null)
            const response = await fetch(`${API_URL}/user/register`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password,name,surname,nif,phone,city,province,postalCode,address,addressSpecific})
            })
            const json = await response.json()
            console.log(json)
          if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }
            if(response.ok){
                await AsyncStorage.setItem('@user', JSON.stringify(json));
    
                //update auth context
               await  dispatch({type:'LOGIN',payload: json})
                setIsLoading(false)
                navigation.navigate('Home')
            }
        }else{
            setError("Introduce toda la información necesaria")
        }
     
    }
    return {signup,isLoading,error}
} 