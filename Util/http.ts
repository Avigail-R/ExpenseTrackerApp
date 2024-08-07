import axios from "axios";
import {ExpenseData} from "../store/expenses-store";
import {Expense} from "../models/Expense";

const baseURL = "https://react-native-4800f-default-rtdb.firebaseio.com";
export async function storeExpense(expense: ExpenseData) {
  const res = await axios.post(baseURL + "/expenses.json",
      expense);
  return res.data.name;

}
export async function fetchExpenses() {  
  const response = await axios.get(baseURL+ "/expenses.json"); 
  const expenses: Expense[] = [];
    for (const key in response.data) {
      const expenseObj: Expense = {
        date: new Date(response.data[key].date),
        amount: response.data[key].amount,
        description: response.data[key].description,
        id: key,
      }
        expenses.push(expenseObj);
    }
  return expenses;
}
export async function deleteExpenseDB(id: string) {
  await axios.delete(baseURL + `/expenses/${id}.json`);
}
export async function updateExpenseDB(id: string, expenseData: ExpenseData) {
  return await axios.put(baseURL + `/expenses/${id}.json`, expenseData);
}