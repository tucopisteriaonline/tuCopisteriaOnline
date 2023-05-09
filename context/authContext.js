import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default: state
        
    }

}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const getData2 = async () => {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('@user'));

                if (user) {
                    dispatch({ type: 'LOGIN', payload: user })
                }
                /* console.log("CONTEXT START")
                 console.log("AuthContext state",user)*/
            } catch (e) {
                // error reading value
            }
        }
        getData2()
    }, [])




    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}