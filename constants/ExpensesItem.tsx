import { View, Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "./Styles";
import { getFormattedDate } from "../Util/Date";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {RootStackParamList} from "../App";



type ExpensesItemProps = {
    id: string;
    description: string;
    amount: number;
    date: Date;
};

function ExpensesItem({id, description, amount, date }: ExpensesItemProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {expenseId: id});
    }

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expensesItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpensesItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expensesItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold"
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: "bold"
    }
});
