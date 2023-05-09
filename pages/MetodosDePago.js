import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking, Modal, TextInput } from 'react-native'
import CloseIcon from '../Icons/CloseIcon'
import ButtonFinal from '../components/ButtonFinal'

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TopBackNavigation from '../components/TopBackNabigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

import ModalCrearTarjeta from '../components/ModalCrearTarjeta'

export const MetodosDePago = () => {
  const DatosFacturacionStack = createNativeStackNavigator();

  const MetodosPago = () => {
    const [modalView, setModalView] = useState(false);
    const [modalData, setModalData] = useState(false);

    const [data, setData] = useState();
    const [visible, setVisible] = useState(false);

    const [numTarjeta, setNumTarjeta] = useState();
    const [caducidad, setCaducidad] = useState();


    const [error, setError] = useState();

    useEffect(() => {

      const getData2 = async () => {
        try {
          const jsonValue = JSON.parse(await AsyncStorage.getItem('@Tarjetas'));
          console.log("TARJETAS"+JSON.stringify(jsonValue))
          if (jsonValue && jsonValue != '') {
            setData(jsonValue)
          }
        } catch (e) {
        }
      }
      getData2();
      JSON.stringify(data)

    }, []);

    const deleteDatos = (item) => {
      const datosId = item.uid;
      //console.log(articleId);
      const newData = [...data];
      //  console.log(newCarrito);
      for (var i = 0; i < newData.length; i++) {

        if (newData[i].uid === datosId) {
          newData.splice(i, 1);
        }
      }
      if (newData.length > 0) {
        setData(newData);

      } else {
        setData(null);
      }

      AsyncStorage.setItem('@Tarjetas', JSON.stringify(newData));
    }

    const handleSubmit = async () => {

      const valueKey = await AsyncStorage.getItem('@Tarjetas');
      const NuevoDatos = ({ uid, numTarjeta, caducidad })
      console.log(uid)

      if (valueKey != null) {
        const theobject = JSON.parse(valueKey);
        for (var i = 0; i < theobject.length; i++) {

          if (theobject[i].uid === NuevoDatos.uid) {
            theobject[i] = NuevoDatos;
            break;
          }
        }
        await AsyncStorage.setItem('@Tarjetas', JSON.stringify(theobject));
        setData(theobject);

      }


      setVisible(false)
    }

    return (
      <>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.h1}>Metodos De Pago</Text>
          </View>
          {data && data.map((item, index) => {
            return (

              <View style={styles.ctnDireccion} key={index}>
                <View style={styles.ctnInfo}>
                  <Text style={styles.nombre}>{item.numTarjeta}</Text>
                  <Text style={styles.info}>{item.caducidad}</Text>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity style={styles.btn} onPress={() => deleteDatos(item)}>
                    <CloseIcon size={25} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

            )

          })
      }
        </ScrollView>
        <Modal
          animationType="fade"
          transparent
          visible={visible}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(1,1,1,0.5)',
            justifyContent: 'center',
            alignItems: 'center',

          }}>
            <View style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#fff',
            }}>
              <View style={{
                height: 45,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 10,
              }}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <CloseIcon size={30} color="black" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={styles.mcontainer}>
                  <View style={styles.wrapper} >
                    <Text style={styles.label}>Num Tarjeta</Text>
                    <TextInput
                      style={styles.input}
                      value={numTarjeta}
                      onChangeText={text => setNumTarjeta(text)}

                    />

                    <Text style={styles.label}>Fecha caducidad</Text>
                    <TextInput
                      style={styles.input}
                      value={caducidad}
                      onChangeText={text => setCaducidad(text)}

                    />

                    <TouchableOpacity style={styles.mBtn} onPress={() => {
                      handleSubmit()
                    }}>
                      <Text style={styles.btnText}>GUARDAR</Text>
                    </TouchableOpacity>
                    {error
                      &&
                      <Text style={styles.error}>{error}</Text>

                    }
                  </View>
                </View>
              </ScrollView>
            </View>

          </View>


        </Modal>
        <View style={styles.btContainer}>
          <ButtonFinal title="Crear" onPress={() => setModalView(true)} />
        </View>

        <ModalCrearTarjeta
          visible={modalView}
          onClose={() => setModalView(false)}
          setData={setData}

        />
      </>

    )
  }

  return (
    <>
      <DatosFacturacionStack.Navigator screenOptions={{ headerShown: true }} >
        <DatosFacturacionStack.Screen name="MetodosDePago" component={MetodosPago}
          options={({ route }) => (
            {
              headerTitle: () => <TopBackNavigation />, headerBackVisible: false, headerStyle: { backgroundColor: '#FDE619' }
            })} />
      </DatosFacturacionStack.Navigator>
    </>
  )



}






const styles = StyleSheet.create({
  containerDefault: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  h1: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 100,
    backgroundColor: 'white',
  },
  ctnDireccion: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  ctnInfo: {
    flex: 1,
    justifyContent: 'space-between',
    //backgroundColor: 'blue',
  },
  nombre: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
  },
  tel: {
    color: 'black',
    fontSize: 14,
  },
  info: {
    fontSize: 14,
  },
  buttons: {
    flex: 1,
    height: '100%',
    //backgroundColor:'red',
    flexDirection: 'column',
    maxWidth: 90,
    justifyContent: 'space-between',
    alignContent: 'flex-end',


  },
  btn: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHozontal: 10,
  },
  btContainer: {

    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
  },

  ///////////////
  mcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  wrapper: {
    paddingVertical: 15,
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  label: {
    color: 'black',
    marginBottom: 4,
  },
  link: {
    color: 'blue',
  },
  loginError: {
    color: 'red',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#f0e5e4',
  },
  mBtn: {
    backgroundColor: "#FDE619",
    color: 'black',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 7,
    marginTop: 8,
  },
  btnText: {
    fontWeight: '500',
    color: 'black',
  },
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
  },

  error: {
    padding: 10,
    backgroundColor: '#ffefef',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'red',
    color: 'red'
  }
});

