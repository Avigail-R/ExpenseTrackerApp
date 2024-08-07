import { StyleSheet, View } from "react-native";
import {useLayoutEffect, useState} from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/Styles";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import useExpensesStore, {ExpenseData} from "../store/expenses-store";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";
import {storeExpense, updateExpenseDB, deleteExpenseDB} from "../Util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErorrOverlay";

type ManageExpenseScreenProps = {
    route: RouteProp<RootStackParamList, 'ManageExpense'>;
    navigation: StackNavigationProp<RootStackParamList, 'ManageExpense'>;
};
function ManageExpense({ route, navigation }: ManageExpenseScreenProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {expenses, addExpense, deleteExpense, updateExpense} = useExpensesStore();
    const editExpenseId = route.params?.expenseId;
    const isEditing = !!editExpenseId;
    const selectedExpense = expenses.find((expense) => expense.id === editExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        if (!editExpenseId) {
            return;
        }
        setIsSubmitting(true);
        try{
            await deleteExpenseDB(editExpenseId);
            deleteExpense(editExpenseId);
            navigation.goBack(); 
        }
        catch (error) {
            setError("Could not delete expense");
            setIsSubmitting(false);
        }
        
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData: ExpenseData) {
        setIsSubmitting(true);
        if (isEditing) {
            updateExpense(editExpenseId, expenseData);
            await updateExpenseDB(editExpenseId, expenseData);
        } else {
            const id = await storeExpense(expenseData);
             addExpense({...expenseData, id: id});
        }
        navigation.goBack();
    }
  
    if(error && !isSubmitting) {
        return <ErrorOverlay massage={error} />
    }
    
    if (isSubmitting) {
        return <LoadingOverlay/>;
    }
        return (
            <View style={styles.container}>
                <ExpenseForm 
                    onCancel={cancelHandler} 
                    onSubmit={confirmHandler}
                    summitButtonLevel={isEditing ? 'Update' : 'Add'}
                    defaultValues={selectedExpense}
                />
                {isEditing && (
                    <View style={styles.deleteContainer}>
                        <IconButton
                            icon="trash"
                            color={GlobalStyles.colors.error500}
                            size={36}
                            onPress={deleteExpenseHandler}
                        />
                    </View>
                )}
            </View>
        );
    
}
export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});
