import React from 'react'
import {View,Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import Customers from './Customers'
import CustDetails from './CustDetails'
import NewCust from './NewCust'

import Transaction from './Transaction'

const Stack = createStackNavigator();

export default function NavigatorScreen(){
    return(
      <NavigationContainer>
          <Stack.Navigator screenOptions = {{
              headerStyle:{
                  backgroundColor:"#0246a6"
              },
              headerTintColor:"#fff",
              title:"MSS Bank",
              headerTitleStyle:{
                 fontSize:30
             } ,
             headerTitleAlign:'center'
          }}>
              <Stack.Screen name = "HomeScreen" component = {HomeScreen}/> 
              <Stack.Screen name = "Customers" component = {Customers}/>
              <Stack.Screen name = "CustDetails" component = {CustDetails}/>
              <Stack.Screen name = "NewCust" component = {NewCust}/> 
              <Stack.Screen name = "Transaction" component = {Transaction}/>
           
          </Stack.Navigator>
      </NavigationContainer>
    )
}
