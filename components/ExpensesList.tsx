import {FlatList, Text} from "react-native";
import {Expense} from "../models/Expense";
import ExpensesItem from "../constants/ExpensesItem";

function renderExpenseItem(itemData: { item: Expense }) {
    return <ExpensesItem {...itemData.item}/>
}
function ExpensesList({expenses}: {expenses: Expense[]}) {
    return(
    <FlatList 
        data={expenses}
        renderItem={renderExpenseItem} 
        keyExtractor={(item) => item.id}
    />);
}
export default ExpensesList;