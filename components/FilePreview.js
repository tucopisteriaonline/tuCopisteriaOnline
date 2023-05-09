import React, { useState, onChange } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Pdf from "react-native-pdf";
export const FilePreview = ({ source, id }) => {
    const [width, setWidth] = useState();
    const [height, setHeigth] = useState();

    if (id === "Normal") {
        return (
            <>
                <View style={[width > height ? styles.ctnH_1 : styles.ctnV_1]}>
                    <Pdf
                        fitWidth={true}
                        source={source}
                        singlePage={true}
                        onLoadComplete={(numberOfPages, filePath, { width, height }, tableContents) => {
                            setHeigth(height);
                            setWidth(width);
                        }}
                        style={styles.pdf}
                    />
                </View>
            </>

        );
    }
    if (id === "2/Vertical" || id === "2/Horizontal") {
        return (
            <>
                <View style={[width > height ? styles.ctnH_2 : styles.ctnV_2]}>
                    <Pdf

                        source={source}
                        singlePage={true}
                        onLoadComplete={(numberOfPages, filePath, { width, height }) => {
                            console.log(`Number of page: ${numberOfPages}`);
                            console.log("W--> " + width + "H---> " + height);
                        }}
                        style={styles.pdf}
                    />
                </View>
                <View style={[width > height ? styles.ctnH_2 : styles.ctnV_2]}>
                    <Pdf
                        source={source}
                        singlePage={true}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        page={2}
                        style={styles.pdf}
                    />
                </View>
            </>

        );
    }

    if (id === "4/Horizontal") {
        return (
            <>
                <View style={styles.pMain}>

                    <View style={styles.pRow}>
                        <View style={styles.prueba}>
                            <View style={[width > height ? styles.ctnH_2 : styles.ctnV_2]}>
                                <Pdf
                                    source={source}
                                    singlePage={true}
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`Number of pages: ${numberOfPages}`);
                                    }}
                                    style={styles.pdf}
                                />
                            </View>
                        </View>
                        <View style={styles.prueba}>
                            <View style={[width > height ? styles.ctnH_2 : styles.ctnV_2]}>
                                <Pdf
                                    source={source}
                                    singlePage={true}
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`Number of pages: ${numberOfPages}`);
                                    }}
                                    style={styles.pdf}
                                    page={2}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.pRow}>
                        <View style={styles.prueba}>
                            <View style={[width > height ? styles.ctnH_2 : styles.ctnV_2]}>
                                <Pdf
                                    source={source}
                                    singlePage={true}
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`Number of pages: ${numberOfPages}`);
                                    }}
                                    style={styles.pdf}
                                    page={3}
                                />
                            </View>
                        </View>
                        <View style={styles.prueba}>
                            <View style={[width > height ? styles.ctnH_2 : styles.ctnV_2]}>
                                <Pdf
                                    source={source}
                                    singlePage={true}
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`Number of pages: ${numberOfPages}`);
                                    }}
                                    style={styles.pdf}
                                    page={4}
                                />
                            </View>
                        </View>
                    </View>

                </View>

            </>

        );
    }


}


const styles = StyleSheet.create({


    pdf: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',

    },



    ///PDF HORIZONTAL
    ///////NORMAL
    ctnH_1: {

        flex: 1,
        width: '100%',
        height: '100%',
        transform: [{ rotate: "-90deg" }],

    },
    ///////DOS PAGINAS POR CARA && DOS DIAPOSITIVAS POR CARA
    ctnH_2: {
        flex: 1,
        width: '100%',
        height: '100%',

    },

    prueba: {
        transform: [{ rotate: "90deg" }],
        height: 70,
        width: 70,
        marginVertical: 5,

    },


    pMain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    pRow: {
        justifyContent: 'center',
    },


    ///PDF VERTICAL *NORMAL 
    ///////NORMAL
    ctnV_1: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    ///////DOS PAGINAS POR CARA && DOS DIAPOSITIVAS POR CARA
    ctnV_2: {
        flex: 1,
        width: '100%',
        height: '100%',
        transform: [{ rotate: "-90deg" }],
    },


});
