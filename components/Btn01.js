import { StyleSheet, View, Pressable,TouchableOpacity, Text } from 'react-native';


export default function Btn1({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    appButtonContainer: {
        
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 14,
        minWidth:'40%',
   
        backgroundColor:'#FDE619',

        alignContent:'center',
        justifyContent:'center',
     

        
      },
      appButtonText: {
       textAlign: 'center',

        fontSize: 16,
        color: 'black',
        fontWeight: '500',
      }
});