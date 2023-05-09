import { useState ,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCarritoState = () => {
    const [suma, setSuma] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const jsonValue = await AsyncStorage.getItem('@carrito');

            const SumaNueva = JSON.parse(jsonValue).length;
            if (SumaNueva !== 0) {
                setSuma(SumaNueva);
            } else {
                setSuma(SumaNueva);
            }

        }
        getData();
    }, [])




    return { suma, setSuma }
}