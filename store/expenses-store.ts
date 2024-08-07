import { create } from 'zustand';
import { fetchExpenses } from '../Util/http';

export interface Expense {
    id: string;
    description: string;
    amount: number;
    date: Date;
}

export interface ExpenseData {
    description: string;
    amount: number;
    date: Date;
}

interface ExpensesState {
    expenses: Expense[];
    addExpense: (expenseData: Expense) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, expenseData: ExpenseData) => void;
    fetchAndSetExpenses: (expensesData: Expense[]) => Promise<void>;
}

const useExpensesStore = create<ExpensesState>((set) => ({
    expenses: [],
    addExpense: (expenseData) =>
        set((state) => {
            const id = new Date().toISOString() + Math.random().toString();
            const newExpense: Expense = { ...expenseData, id: id };
            return { expenses: [newExpense, ...state.expenses] };
        }),
    deleteExpense: (id) =>
        set((state) => ({
            expenses: state.expenses.filter((expense) => expense.id !== id),
        })),
    updateExpense: (id, expenseData) =>
        set((state) => {
            const updatedExpenses = state.expenses.map((expense) =>
                expense.id === id ? { ...expense, ...expenseData } : expense
            );
            return { expenses: updatedExpenses };
        }),
    fetchAndSetExpenses: async (expenses) => {
        set({ expenses });
    },
}));

export default useExpensesStore;
