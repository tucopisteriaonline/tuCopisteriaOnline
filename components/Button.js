import { StyleSheet, View, Pressable, Text } from 'react-native';


export default function Button({ title ,onPress }) {
    return (
      <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonLabel}>{title}</Text>
          </Pressable>
        </View>
    );
  }

const styles = StyleSheet.create({
  buttonContainer: {
    height: '100%',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    alignSelf:'center',
  },
  button: {
    flex:1,
    borderRadius: 40,
    minWidth: 170,
    maxWidth: 200,

    paddingHorizontal:14,
    paddingVertical:7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor:'#FDE619',

  },
  buttonLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight:'bold'
  },
});