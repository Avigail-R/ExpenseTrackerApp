import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import ResentExpenses from "./screens/ResentExpenses";
import {GlobalStyles} from "./constants/Styles";
import React from "react";
import {Ionicons} from '@expo/vector-icons';
import IconButton from "./UI/IconButton";

const Stack = createNativeStackNavigator();
const ButtonStack = createBottomTabNavigator();
export type RootStackParamList = {
    ExpensesOverview: undefined;
    ManageExpense: { expenseId?: string };

};
function ExpensesOverview() {
  return (
      
      <ButtonStack.Navigator screenOptions={({navigation}) => ({
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, 
          headerTintColor: 'white',
          tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500,paddingBottom: 5},
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({tintColor}) =>  <IconButton icon="add" size={24} color={tintColor} onPress={()=>{
              navigation.navigate('ManageExpense');
  
          }}/>
      })}>
        <ButtonStack.Screen name="ResentExpenses" component={ResentExpenses} options={{
            title: 'Resent Expenses',
            tabBarLabel: 'Resent Expenses',
            tabBarIcon: ({color,size}) => {
                return <Ionicons name="hourglass" size={size} color={color} />
            },
        }}/>
        <ButtonStack.Screen name="AllExpenses" component={AllExpenses} options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({color,size}) => {
                return <Ionicons name="calendar" size={size} color={color}/>
            }
        }}/>
      </ButtonStack.Navigator>);
}
export default function App() {
  return (
      <>
        <StatusBar style="light"/><NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white',
            }}
        >
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}}/>
          <Stack.Screen
              name="ManageExpense" 
              component={ManageExpense} 
              options={{ presentation: 'modal'}}/>
        </Stack.Navigator>

      </NavigationContainer>
      </>
  );
}

