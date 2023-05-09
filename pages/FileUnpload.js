import React, { useState, useEffect } from "react";
import DocumentPicker from 'react-native-document-picker';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Modal, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import Pdf from "react-native-pdf";

import Archivo from '../components/archivo';
import Btn1 from "../components/Btn01";
import UnploadIcon from "../Icons/UnploadaIcon";
import GetNumPages from "../components/GetNumPges";
import DraggableFlatList from "react-native-draggable-flatlist";
import DeleteIcon from '../Icons/DeleteIcon';
import DragIcon from "../Icons/DragIcon";
import CheckBox from "@react-native-community/checkbox";
import EyeIcon from "../Icons/EyeIcon";
import CustomModal from "../components/CustomModal";


export default FileUnpload = ({ navigation }) => {
    const [fileResponse, setFileResponse] = useState([]);
    const [caras, setCaras] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [checkedList, setCheckedList] = useState([]);

    const handleDocumentSelection = async () => {
        setIsLoading(true);
        console.log("isloading" + isLoading)

        try {
            const result = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.pdf],
                copyTo: "documentDirectory",
            });

            result.map(item => {
                //LIMITAR ARCHIVOS DE MAS DE 250MG
                if (item.size < 250000000 ) {
                    let duplicate = false;
                    fileResponse.map(original => {
                        if (original.name === item.name) {
                            duplicate = true;
                        }
                    })
                    if (duplicate === false) {
                        setFileResponse(fileResponse => [...fileResponse, item])
                    } else {
                        alert("El archivo " + item.name + " ya está importado")
                    }
                }
                else{
                    alert("El archivo " + item.name + " es demasiado pesado")
                }

            })
            // setFileResponse();
            console.log("files here")

        } catch (e) {
            console.log("error here")
            console.log(e)
        } finally {
            setIsLoading(false);
            console.log("isloading" + isLoading)
        }
    };

    const handleSeguir = async () => {
        console.log(fileResponse)

        if (fileResponse.length !== 0) {
            navigation.navigate('FileConfiguration', { 'archivos': fileResponse, 'numCaras': caras })
        } else {
            alert("Sube algun DOCUMENTO para seguir")
        }
    }



    const deleteArchivo = (e) => {
        console.log()
        const name = e.name;
        setFileResponse(fileResponse.filter(item => item.name !== name));
    }
    const deleteAllArchivo = () => {
        console.log("DELETE ALL CHECKLIST" + checkedList);

        //  setFileResponse([]);


        checkedList.forEach(function (item2) {
            // console.log("ITEM2 " + item2);
            setFileResponse(fileResponse.filter(item => !checkedList.includes(item.name)));

        });
        setCheckedList([]);
        /* setFileResponse(fileResponse => {
             return { items: fileResponse.items.filter(item => !checkedList.includes(item.name)) };
 
         });*/
    }
    const añadirCheckList = (e, newValue) => {
        //console.log(newValue);
        if (newValue === true) {
            setCheckedList(checkedList => [...checkedList, e]);
        } else {
            setCheckedList(checkedList.filter(item => item !== e));
        }


    }

    renderItem = ({ item, getIndex, drag, isActive }) => {
        const [modalView, setModalView] = useState(false);
        const [pages, setPages] = useState(0);
        const [checked, setChecked] = useState(false);
        const index = getIndex();
        fileResponse[index].pages = pages

        return (
            <>
                <GetNumPages data={[item]} onChange={value => setPages(value)} />
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        styles.ctn,
                        { backgroundColor: isActive ? "grey" : "white" },
                        { marginTop: isActive ? 0 : 5 }
                    ]}
                >
                    <View style={styles.col0}>
                        <CheckBox
                            disabled={false}
                            value={checked}
                            onValueChange={(newValue) => {
                                setChecked(newValue),
                                    añadirCheckList(item.name, newValue);
                            }}
                            tintColors={{ true: 'black', false: 'black' }}
                        />
                        <TouchableOpacity onPress={() => setModalView(true)}>
                            <EyeIcon size={20} color={"black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.col2}>
                        < DragIcon size={20} color={"grey"} />
                    </View>
                    <View style={styles.col1}>
                        <Text numberOfLines={2} style={styles.item}>{getIndex() + 1} - {item.name}</Text>
                        <Text style={styles.infoArchivoText}>{Math.round(item.size / 1000)}KB    {pages} páginas</Text>
                    </View>
                   
                    <View style={styles.col3}>
                        <TouchableOpacity style={styles.btn} onPress={() => deleteArchivo(item)} >
                            <DeleteIcon color={"black"} size={25} />
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>

                <CustomModal
                    visible={modalView}
                    onClose={() => setModalView(false)}
                    data={item}
                />


            </>
        )
    }

    if (fileResponse.length === 0 && isLoading === false) {
        return (
            <SafeAreaView style={styles.containerDefault}>
                <UnploadIcon color={"grey"} size={150} />
                <Btn1 title="Importar Archivos" onPress={() => {
                    handleDocumentSelection()
                }
                } />
            </SafeAreaView>
        )
    } else {
        if (isLoading) {
            return (<SafeAreaView style={styles.containerDefault}>
                <ActivityIndicator size="large" color="#464644" />
            </SafeAreaView>)
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <GetNumPages data={fileResponse} onChange={value => setCaras(value)} />
                    {/*<ScrollView style={styles.fileContainer}>
                            <Text style={styles.titulo}>Organiza tus archivos</Text>
                             {fileResponse.map((item, index) => {
                                return (
                                    <Archivo key={index} index={index} props={item} onChange={value => deleteArchivo(value)} />
                                )
                            })}
                        </ScrollView >*/ }

                    <View style={styles.ctnTop}>
                        <Text style={styles.titulo}>Organiza tus archivos</Text>
                        <TouchableOpacity style={styles.btnTop} onPress={() => deleteAllArchivo()} >
                            <DeleteIcon color={"black"} size={25} />
                        </TouchableOpacity>

                    </View>

                    <DraggableFlatList style={styles.fileContainer}
                        data={fileResponse}
                        onDragEnd={({ data }) => setFileResponse(data)}
                        keyExtractor={(item) => (item.name)}
                        renderItem={renderItem}
                    />

                    <View style={styles.btContainer}>
                        <Btn1 title="Añadir Archivos" onPress={handleDocumentSelection} />
                        <Btn1 title="Seguir" onPress={handleSeguir} />
                    </View>

                </SafeAreaView>
            );
        }



    }

}

const styles = StyleSheet.create({
    containerDefault: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignContent: 'center',
        padding: 8,
    },
    fileContainer: {
        //padding: 5,
        //height: '100%',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical: 10,

    },

    btContainer: {

        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-around'


    },
    item: {
        maxWidth: '100%',
        //padding: 21,
        fontSize: 14,
        color: 'black',
        marginBottom: 2,
        marginRight: 15,


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
        padding: 10,
    },
    btn: {
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'red',
        //marginHorizontal: 20,
        paddingHorizontal: 3,
        borderRadius: 15,
    },
    infoArchivoText: {
        fontSize: 12,
        color:'grey',
    },
    col0: {
        width: 2,
        alignItems: 'center',
        marginRight: 25,
        marginLeft: 8,
    },
    col1: {
        flex: 1,
        //backgroundColor:"green",
        justifyContent: 'center',
    },
    col2: {
        // backgroundColor:"blue",
        marginRight: 10,
    },
    col3: {
        // backgroundColor:"yellow",
        margin: 5,
    },
    ctnTop: {
        //  flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    btnTop: {
        marginHorizontal: 10,
    },



});
