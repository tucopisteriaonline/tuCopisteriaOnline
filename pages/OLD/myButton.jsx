import { Button, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { color } from "react-native-reanimated";


const myButton = ({ configuracion, change, opt, value }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                ...styles.button,
                backgroundColor: configuracion[opt] === `${value}` ? "#FDE619" : "#DBDBDB"
            }}
            name={opt}
            value={value}
            onPress={() => change(value, opt)}
        >
            <Text style={styles.btnText}>{value}</Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({

    button: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 3,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    },


});

export default myButton;
