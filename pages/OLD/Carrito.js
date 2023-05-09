import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoArticulo from "../components/InfoArticulo";
import Btn01 from "../components/Btn01";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DeleteIcon from "../Icons/DeleteIcon";
import Pdf from "react-native-pdf";
export default function Carrito({ navigation }) {


    const [carrito, setCarrito] = useState(null);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const calTotal = (e) => {
        let final = 0;
        for (let i = 0; i < e.length; i++) {
            final = final + parseFloat(e[i][3]);
        }
        setTotal(final.toFixed(2));
    }

    useEffect(() => {
        setIsLoading(true)
        const getData2 = async () => {
            try {
                const jsonValue = JSON.parse(await AsyncStorage.getItem('@carrito'));
                // console.log("useeffect" + jsonValue);
                if (jsonValue && jsonValue != '') {
                    setCarrito(jsonValue);
                    calTotal(jsonValue);
                }

                setIsLoading(false)

            } catch (e) {
                // error reading value
            }
        }
        getData2();
        ;
    }, []);


    const clear = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            // remove error
        }
        console.log('Delete')
        setCarrito(null);
    }
    const deleteArticle = (item) => {
        const articleId = item[0];
        //console.log(articleId);
        const newCarrito = [...carrito];
        //  console.log(newCarrito);
        for (var i = 0; i < newCarrito.length; i++) {

            if (newCarrito[i][0] === articleId) {
                newCarrito.splice(i, 1);
            }
        }
        if (newCarrito.length > 0) {
            setCarrito(newCarrito);
            calTotal(newCarrito);
        } else {
            setCarrito(null);
        }

        AsyncStorage.setItem('@carrito', JSON.stringify(newCarrito));
    }

    const showConfirmDialog = (item) => {
        // <ConfirmationAlert data={item} title={"Delete??"} text={"are you sure you want to delete"}/>
        return Alert.alert(
            "¿Quieres eliminar este artículo?",
            "Estás seguro de que quieres eliminar este artículo?",
            [
                // The "Yes" button
                {
                    text: "Si",
                    onPress: () => {
                        deleteArticle(item);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };
    if (isLoading) {
        <ActivityIndicator size="large" color="#464644" />
    } else {
        if (carrito) {
            return (
                <SafeAreaView style={styles.mainCtn}>
                    <View style={styles.topCtn}>
                        <Text style={styles.titulo}>Carrito</Text>
                        <TouchableOpacity style={styles.deleteBtn} onPress={clear} >
                            <DeleteIcon size={20} color={"#FD1919"} />
                            <Text style={styles.deleteText} >Vaciar Carrito</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {
                            carrito.map((item, index) => {
                                // console.log("FILEcopy :"+item[2][0].size);
                                const url = decodeURI(item[2][0].fileCopyUri);
                                const source = { uri: url, cache: false };
                                return (

                                    <View key={index}>
                                        <View style={styles.container}>
                                            <View style={styles.cntInfo}>
                                                <View style={styles.pdfCnt}>
                                                    <Pdf
                                                        fitWidth={true}
                                                        source={source}
                                                        singlePage={true}
                                                        onLoadComplete={(numberOfPages, filePath, tableContents) => {

                                                        }}
                                                        style={styles.pdf}
                                                    />
                                                </View>
                                                <InfoArticulo index={index} data={item} />
                                            </View>


                                            <View style={styles.btnCtn}>
                                                <Btn01 title="Editar" onPress={() => navigation.navigate("FileEdit", { item })} />
                                                < Btn01 title="Eliminar" onPress={() => showConfirmDialog(item)} />
                                            </View>
                                        </View>
                                    </View>



                                )
                            })

                        }
                    </ScrollView >

                    {/** <Text>{JSON.stringify(carrito)}</Text>*/}


                    <View style={styles.ctnBottom}>
                        <View style={styles.ctnTotal}>
                            <Text style={styles.textTotal}>Total</Text>
                            <Text style={styles.textTotal}>{total} €</Text>
                        </View>
                        <View style={styles.ctnBtnComprar}>
                            <TouchableOpacity style={styles.BtnComprar} onPress={() => navigation.navigate('Compra')} >
                                <Text style={styles.appButtonText}>Continuar</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </SafeAreaView>
            )


        } else {
            return (
                <><View style={styles.ctnDefault}>
                    <Text>No tienes articulos en el carrito!!</Text>
                </View></>)
        }
    }


}
const styles = StyleSheet.create({

    pdf: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',

    },
    mainCtn: {
        flex: 1,
        marginBottom: 40,
        marginBottom: 'auto',
    },
    container: {
        margin: 4,
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
    },
    btnCtn: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ctnBottom: {
        borderTopWidth: 1,
        borderColor: 'grey',
        marginBottom: 'auto',
        padding: 20,
        backgroundColor: 'white',
    },
    ctnTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ctnBtnComprar: {
        marginTop: 20,
        alignItems: 'center',
    },
    BtnComprar: {
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 14,
        minWidth: '100%',
        backgroundColor: '#FDE619',

        alignContent: 'center',
        justifyContent: 'center',
    },
    appButtonText: {
        textAlign: 'center',

        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    textTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    ctnDefault: {
        alignItems: 'center',
        padding: 20,
    },
    topCtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    deleteBtn: {
        flexDirection: 'row',
        padding: 2,
        borderRadius: 15,

    },
    deleteText: {
        color: '#FD1919',
        fontSize: 14,
    },
    pdfCnt: {
        backgroundColor: 'white',
        width: 70,
        borderRadius: 7,
    },
    cntInfo: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },


});

/* const storeData = async () => {
    try {
        const jsonValue = JSON.stringify(pedidos)
        await AsyncStorage.setItem('@carrito', jsonValue)
    } catch (e) {
        // saving error
    }
}



const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@carrito')
        setCarrito(jsonValue != null ? JSON.parse(jsonValue) : null);

    } catch (e) {
        // error reading value
    }
}


const addData = async () => {
    try {
        const oldData = JSON.parse(await AsyncStorage.getItem('@carrito'))

        const newData = [...oldData, Nuevospedidos];
        await AsyncStorage.setItem('@carrito', JSON.stringify(newData));
    } catch (e) {
        // saving error
    }
}*/
