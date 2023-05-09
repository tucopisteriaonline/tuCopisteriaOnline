import { StyleSheet, View, Pressable, TouchableOpacity, Text } from 'react-native';
import Pdf from 'react-native-pdf';

export default function GetNumPages(props) {
    //const source = { uri: url, cache: true };
    // const url = archivos[0].uri
    //console.log("patata" + data);
    const data = props.data;
    const  sumaFinal=0;
    let pageNum = 0;
    return (
        <>
            {
                data.map((item, index) => {
                 //   console.log(item);
                    let source = { uri: item.uri, cache: true };
                    return (
                       <Pdf key={index}
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                                //console.log(`Number of pages: ${numberOfPages}`);
                                pageNum = parseInt(pageNum) + parseInt(numberOfPages)
                                //console.log("Num de caras : "+pageNum);
                                props.onChange(pageNum)
                            }}
                        />
                    )
                })
                
            }
        </>
    );

}

