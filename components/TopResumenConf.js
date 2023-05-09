import { StyleSheet, Text, View } from 'react-native';

export default ResumenConfTop = ({ data }) => {

  const filteredObj = Object.entries(data)
    .filter(([, value]) => value !== '')
    .filter(([key,]) => key !== 'caras')
    .filter(([key,]) => key !== 'finisher_docblock')
    .filter(([key,]) => key !== 'finisher_stapled')
    .filter(([key,]) => key !== 'hoja_de_color')
    .filter(([key,]) => key !== 'finishing_price')

    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return (
    <View style={styles.resumen}>
      {Object.entries(filteredObj).map(([key, value]) => (

        <Text style={styles.resumenText} key={key}>
          {key === 'copy_number' ? `${value} copias` :
            key === 'paginas_color_seleccionada' ? `Portada hoja color` :
              `${value}`}
        </Text>

      ))}
    </View>
  )


}

const styles = StyleSheet.create({
  resumen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    textAlign: 'start',
  },
  resumenText: {
    color: 'black',
    fontSize: 12,
    backgroundColor: '#FDE619',
    padding: 2,
    borderRadius: 4,
    margin: 3,

  },
});