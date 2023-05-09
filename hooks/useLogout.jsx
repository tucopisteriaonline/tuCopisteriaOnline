import { useAuthContext } from "./useAuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation ,CommonActions} from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const useLogout = () => {
    const navigation = useNavigation()
    const { dispatch } = useAuthContext();

    const logout = () => {
        //remove user from local estorage
        AsyncStorage.removeItem('@user')

        //FIREBASE
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
            });
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();

        //dispatch logout opction
        dispatch({ type: 'LOGOUT' })
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            }),
            navigation.navigate('Home')
        );
    }

    return { logout }
}