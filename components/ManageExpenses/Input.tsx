import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Input({ label, style, textInputConfig, invalid }: { label: string, style?: any, textInputConfig: any, invalid?:boolean }) {
    let inputStyle: any = [styles.input];
    if (textInputConfig && textInputConfig.multiline) {
        inputStyle.push(styles.inputMultiline);
    }
    if (invalid) {
        inputStyle.push(styles.invalidInput);
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyle} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
       backgroundColor: GlobalStyles.colors.error50, 
    }
});
