import { StyleSheet, View, Pressable, TouchableOpacity, Text } from 'react-native';


export default function ButtonFinal({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    appButtonContainer: {
        flex:1,
        borderRadius: 7,
        padding:10,
        backgroundColor: '#FDE619',
        marginHorizontal:5,
    },
    appButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    }
});