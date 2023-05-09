import { StyleSheet, View, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeleteIcon from '../Icons/DeleteIcon';
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useState } from 'react';
const Archivo = ({ item, getIndex,drag, isActive }) => {
  //{ item, drag, isActive,onChange }

 const index = getIndex();
  console.log(index)
  console.log("archivo js")
  return (
    <>
      {/*  <View style={styles.ctn}>
        <Text numberOfLines={2} key={props.index} style={styles.item}>{props.props.name}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => props.onChange(props.props)}>
          <DeleteIcon color={"black"} size={25}/>
        </TouchableOpacity>
  </View>*/}


      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.ctn,
            { backgroundColor: isActive ? "grey" : "white" },
            {    marginTop: isActive ? 0 : 5}
          ]}
        >
          <Text style={styles.item}>{index}--{item.name}</Text>
        </TouchableOpacity>

      </ScaleDecorator>
    </>
  );
}


const styles = StyleSheet.create({

  item: {
    maxWidth: '80%',
    //padding: 21,
    fontSize: 13,
    color: 'black',
    whiteSpace: 'nowrap',
    overFlow: 'hidden',
    textOverflow: 'ellipsis',


  },
  ctn: {
    // backgroundColor: '#639fdb',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    // borderWidth: 1,
    // borderRadius: 10,
    padding: 20,
  },
  btn: {
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: 'red',
    //marginHorizontal: 20,
    //padding:3,
    borderRadius: 15,
  },

});

export default Archivo;