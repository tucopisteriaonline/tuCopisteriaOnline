import { Button, Text, TouchableOpacity, StyleSheet,View } from "react-native";
import { color } from "react-native-reanimated";


const myButtonColor = ({ configuracion, change, opt, value,color }) => {
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
            <View
                style={{
                    ...color ? styles.color  : "",
                    backgroundColor: color
                }}
            >
             
            </View>

        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({

    button: {
        borderRadius: 3,
        flex: 1,
        padding:4,
        alignItems: 'center',
    },
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    },
    color:{
        flex: 1,
        padding:15,
        borderRadius: 3,
        borderWidth:1,
      
    }

});

export default myButtonColor;
