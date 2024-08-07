import {View, ActivityIndicator, StyleSheet, Text} from "react-native";
import {GlobalStyles} from "../constants/Styles";
import Button from "./Button";

function ErrorOverlay({massage, onConfirm}: {massage: string, onConfirm?: () => void}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{massage}</Text>
            <Button onPress={onConfirm != null? onConfirm : ()=> {}} >Okay</Button>
        </View>

    );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: "white",
        textAlign: "center",
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    message: {
        
    }
});



