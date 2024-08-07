import {Text} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import useExpensesStore from "../store/expenses-store"
import {useState} from "react";
function AllExpenses(){
    const { expenses } = useExpensesStore();
    const [error, setError] = useState<string | null>(null);
    return <ExpensesOutput fallbackText="no registered expenses found" expenses={expenses} expensesPeriod="Total" />
}
export default AllExpenses;