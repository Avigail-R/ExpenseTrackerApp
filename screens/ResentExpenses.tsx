import ExpensesOutput from "../components/ExpensesOutput";
import useExpensesStore from "../store/expenses-store";
import { getDateMinusDays } from "../Util/Date";
import {useEffect, useState} from "react";
import LoadingOverlay from "../UI/LoadingOverlay";
import {fetchExpenses} from "../Util/http";
import ErrorOverlay from "../UI/ErorrOverlay";

function ResentExpenses() {
    const [isFetching, setIsFFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { expenses, fetchAndSetExpenses } = useExpensesStore((state) => ({
        expenses: state.expenses,
        fetchAndSetExpenses: state.fetchAndSetExpenses,
    }));

    useEffect(() => {
        async function getExpenses() {
            setIsFFetching(true);
            try {
               const expenses= await fetchExpenses();
               fetchAndSetExpenses(expenses);
            } catch (error) {
                setError("Could not fetching expenses");
            }
            setIsFFetching(false);
        }
        
        getExpenses();
    }, []);
    
    function errorHandler() {
        setError(null);
    }
    
    if (error && !isFetching) {
        return <ErrorOverlay massage={error} onConfirm={errorHandler}/>
    }
    if (isFetching) {
        return <LoadingOverlay/> 
    }

    const resentExpenses = expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    return <ExpensesOutput expenses={resentExpenses} fallbackText="No expenses registered for the last 7 days" expensesPeriod="Last 7 Days" />;
}

export default ResentExpenses;
