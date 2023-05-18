import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { API_URL } from './config';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation';
import { AuthContextProvider } from './context/authContext'
import PaginaCerrado from './pages/PaginaCerrado';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CarritoContext = React.createContext();;
const App = () => {

  const [webState, setWebState] = useState();
  const [error, setError] = useState(false);

  const [carritoState, setCarritoState] = useState();

  useEffect(() => {

    const getData = async () => {
      const response = await fetch(`${API_URL}/ConfiguracionWeb`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
      })
      const json = await response.json()
      if (!response.ok) {
        console.log(json.error)
        setError(true)
      }
      if (response.ok) {
        setError(false)
        setWebState(json)
      }
    }
    const getCarrito = async () => {
      const jsonValue = await AsyncStorage.getItem('@carrito');
      const SumaNueva = JSON.parse(jsonValue).length;
      setCarritoState(SumaNueva)

    }

    getCarrito();
    getData();
  }, [])

  if (error || webState && webState.Abierto === 0) {
    return (
      <PaginaCerrado mensaje={webState.MensajeCierre} />
    )

  } else {
    return (
      <CarritoContext.Provider value={[carritoState, setCarritoState]}>
        <AuthContextProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </AuthContextProvider>
      </CarritoContext.Provider>
    )
  }



};



export default App;
