import {View, StyleSheet, Text, Alert} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../../UI/Button";
import {ExpenseData} from "../../store/expenses-store";
import {Expense} from "../../models/Expense";
import {getFormattedDate} from "../../Util/Date";
import {GlobalStyles} from "../../constants/Styles";

export type inputIdentifier = "amountValue" | "dateValue" | "descriptionValue";
function ExpenseForm({onCancel, onSubmit, summitButtonLevel, defaultValues}: {
    onCancel: () => void,
    onSubmit: (expenseData: ExpenseData) => void,
    summitButtonLevel: string,
    defaultValues?: Expense | undefined
})                                {
    const[inputs, setInputs] = useState({
        amountValue: {value: defaultValues? defaultValues.amount.toString() : "",
        isValid: true
        },
        dateValue: {value:defaultValues? getFormattedDate(defaultValues.date) : "",
        isValid: true
        },
        descriptionValue: {value: defaultValues? defaultValues.description : "",
        isValid: true
        }
    })
    function inputChangeHandler(inputIdentifier: inputIdentifier ,EnteredValue: string){
      setInputs((currentInputs) => {
          return{
                ...currentInputs,
                [inputIdentifier]: {value: EnteredValue, isValid: true}
          }
      })
    } 
    function submitHandler(){
        const expenseData = {
            amount: +inputs.amountValue.value,
            date: new Date(inputs.dateValue.value),
            description: inputs.descriptionValue.value
        }
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;
        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
           setInputs((currentInputs) => {
                return{
                     amountValue: {value: currentInputs.amountValue.value, isValid: amountIsValid},
                     dateValue: {value: currentInputs.dateValue.value, isValid: dateIsValid},
                     descriptionValue: {value: currentInputs.descriptionValue.value, isValid: descriptionIsValid}
                }
           })
            return;
        }
        onSubmit(expenseData);
    }
    const fromIsInvalid = !inputs.amountValue.isValid || !inputs.dateValue.isValid || !inputs.descriptionValue.isValid;
    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
        <Input 
            invalid={!inputs.amountValue.isValid}
            style={styles.rowInput}
            label="Amount" textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text: string) => inputChangeHandler("amountValue", text),
            value: inputs.amountValue.value,
            
        }}/>
        <Input 
            invalid={!inputs.dateValue.isValid}
            style={styles.rowInput} label="Date" 
            textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength:10,
            onChangeText: (text: string) => inputChangeHandler("dateValue", text),
            value: inputs.dateValue.value
        }}/>
        </View>
        <Input 
            invalid={!inputs.descriptionValue.isValid}
            label="Description" 
            textInputConfig={{
            multiline: true,
            onChangeText: (text: string) => inputChangeHandler("descriptionValue", text),
            value: inputs.descriptionValue.value 
        }}/>
        {fromIsInvalid && <Text style={styles.errorText}>from is invalid</Text>}
        
        <View style={styles.buttons}>
            <Button style={styles.button} onPress={onCancel} mode="flat">cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{summitButtonLevel}</Button>
        </View>
    </View>
}
export default ExpenseForm;
const styles = StyleSheet.create({
    form:{
       marginTop: 40 
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'white',
        marginVertical: 24,
        textAlign: "center"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
        margin: 8 
    }
});