import { Background } from '@react-navigation/elements';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Button } from 'react-native';



export default function InfoArticulo({ data, index }) {
  console.log("En Articulo :" + JSON.stringify(data));

  const filteredObj = Object.entries(data.configuracion)
    .filter(([, value]) => value !== '')
    .filter(([key,]) => key !== 'caras')
    .filter(([key,]) => key !== 'finisher_docblock')
    .filter(([key,]) => key !== 'finisher_stapled')
    .filter(([key,]) => key !== 'hoja_de_color')
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return (

    <View style={styles.containerMain}>
      <View style={styles.topCnt}>
        <Text style={styles.titulo}>Artículo #{index + 1}</Text>
        <Text style={styles.precioArticulo}>{data.price} €</Text>
      </View>
      <View style={styles.configContainer} >
        <Text>
          {Object.entries(filteredObj).map(([key, value]) => (
            <Text style={styles.text} key={key}>
              {
              key === 'copy_number' ? `${value} copias,` :
              key === 'paginas_color_seleccionada' ? `Portada hoja color,` :
              key === 'finishing_price' ? "" :
              key === 'caras' ? "" :
              key === 'grouped' ? value :
              ` ${value}, `
              }
            </Text>



          ))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    margin: 4,
    padding: 4,
    borderWidth: 1,
    borderRadius: 7,
  },
  configContainer: {
    flex: 1,
    // marginBottom:20,
    marginTop: 5,
  },
  topCnt: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  precioArticulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  containerMain: {
    flex: 1,
    alignContent: 'center',
    //backgroundColor:'red',
    marginHorizontal: 8,

  },
  text: {
    color: 'grey'
  }



});