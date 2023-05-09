import { StyleSheet, View, Pressable,TouchableOpacity, Text } from 'react-native';


export default function BtnInfo({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    appButtonContainer: {
        
        backgroundColor: "black",
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 8,
        minWidth:'40%',
        maxWidth:'50%',

        alignContent:'center',
        justifyContent:'center',

        
      },
      appButtonText: {
       textAlign: 'center',
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
      }
});