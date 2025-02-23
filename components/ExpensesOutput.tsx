﻿import {Animated, StyleSheet, Text} from "react-native";
import View = Animated.View;
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {Expense} from "../models/Expense";
import {GlobalStyles} from "../constants/Styles";


function ExpensesOutput({expenses, expensesPeriod, fallbackText}: {expenses: Expense[], expensesPeriod: string, fallbackText: string}){ {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    if(expenses.length > 0){
        content = <ExpensesList expenses={expenses}/>
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
            {content}
        </View>
    );
}
}
export default ExpensesOutput
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary700,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
        marginTop: 32
    }
});
