
import { useAuthContext } from "../hooks/useAuthContext";
import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Btn01 from "../components/Btn01";
import { useNavigation } from "@react-navigation/native";

export const DatosDeFacturacion = ({ setOkeyDatosFactura }) => {

    const navigation = useNavigation();
    const { user } = useAuthContext();
    const [necesariData, setNecesariData] = useState(true)
    const labels = ["DNI", "TELÉFONO", "NOMBRE", "APELLIDOS", "CIUDAD", "PROVINCIA", "CÓDIGO POSTAL", "DIRECCIÓN", "Nº, PISO, PUERTA"]

    const infoUser = user.user
    const keys = Object.keys(infoUser);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNecesariData(true)
            const infoUser = user.user
            const keys = Object.keys(infoUser);
            console.log("hello")
            keys.slice(8).map((key, index) => {
                if (key != "address_specific") {
                    if (infoUser[key] === "undefined" || infoUser[key] === "") {
                        setNecesariData(false)
                        setOkeyDatosFactura(false)
                        console.log("sin datos de facturación")
                    }

                }
            })
        });


        return unsubscribe;

    }, [navigation])

    if (necesariData) {
        return (
            <>
                <View style={styles.ctnMain}>
                    {keys.slice(8).map((key, index) => {
                        if (key != "procedencia") {
                            return (
                                <View style={styles.ctnInfo} key={index}>
                                    <Text style={styles.infoLabel}>
                                        {labels[index]}:
                                    </Text>
                                    <Text style={styles.infoValue}>
                                        {infoUser[key].toUpperCase()}
                                    </Text>
                                </View>
                            );
                        }

                    })}
                </View>

            </>
        )
    } else {
        return (
            <Btn01 title="Añadir datos de facturación" onPress={() => navigation.navigate('DatosDeFacturacion2')} />
        )

    }

}

const styles = StyleSheet.create({
    infoLabel: {
        color: 'black',
        marginTop: 7,
        fontSize: 14,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400',
    },
    ctnInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 5,
    },
    ctnMain: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
    }
});