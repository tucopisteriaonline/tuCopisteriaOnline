import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import TopBackNabigation from "../components/TopBackNabigation";

export default Otro = () => {
    return (
        <>
        <TopBackNabigation  count={0}/>
            <View style={styles.container}>
                <Text>Oto jejejHHUIJIej</Text>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },

});
