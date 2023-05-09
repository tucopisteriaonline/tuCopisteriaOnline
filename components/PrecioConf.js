import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBackNavigationConf from './TopBackNabigationConf';
export default PrecioConf = ({ data, onChange }) => {

    const caras = data.caras;

    
    const setPaginas = () => {
        if (caras === 1) {
            return caras
        } else {

            if (data.finisher_slisdeshow === "Normal") {
                return caras
            }
            else {
                return ((caras) / 2)
            }
        }

    }
    //const multiplePorCara = multiPorCara();
    const copias = data.copy_number;
    const paginas = setPaginas();
   
    //console.log("paginas: " + paginas)

    let precioFormato = 0;
    let precioConf = 0;
    let suplemento = 0;
    const suplementoFuntion = () => {
        if (data.paper === "100gr") {
            suplemento += 0.01 * paginas;
        }

        if (data.finisher_stapled === "Grapado") {
            suplemento += 0.005;
        }
        if (data.finisher_docblock === "ENCUADERNADO") {
            suplemento += 1;
        }
        if (data.finisher_colored_skin === "Portada a color") {
            suplemento += 0.20;
        }
        if (data.paginas_color_seleccionada !== '') {
            suplemento += 0.10;
        }
        return suplemento;
    }
    const A4 = () => {
        if (data.tint === "COLOR") {
            precioFormato = 0.09;
        } else {
            if (data.tint === "BLACK" &&
                data.print_mode == "2 caras") {
                precioFormato = 0.025;
            }
            if (data.tint === "BLACK" &&
                data.print_mode == "1 cara") {
                precioFormato = 0.03;
            }
        }
        return precioFormato;
    }

    const A5 = () => {
        if (data.tint === "COLOR") {
            precioFormato = 0.06;
        } else {
            precioFormato = 0.02;
        }
        return precioFormato;
    }

    const A3 = () => {
        if (data.tint === "COLOR") {
            precioFormato = 0.2;
        } else {
            precioFormato = 0.06;
        }
        return precioFormato;
    }


    //FORMATO
    if (data.format === "A4") {
        const precioA4 = A4();
        //console.log(precioA4)
        precioConf = precioA4;
    }
    if (data.format === "A3") {
        const precioA3 = A3();
        // console.log(precioA3)
        precioConf = precioA3;
    }
    if (data.format === "A5") {
        const precioA5 = A5();
        // console.log(precioA5)
        precioConf = precioA5;
    }

    const suplementoFinal = suplementoFuntion();



    const precioConfFinal = precioConf;

    let precioFinal = (((precioConfFinal * paginas) + suplementoFinal) * copias).toFixed(2);
    onChange(precioFinal);
    console.log("PRECIO FINAL: " + precioFinal)

   const navigation = useNavigation();
    navigation.setOptions({ headerTitle: () => <TopBackNavigationConf count={precioFinal} /> })
    /*return (
        
        <>
            <View >
                <Text style={styles.resumenText} >{precioFinal}€</Text>
            </View>

        </>
    );*/
    onChange(precioFinal);
}

