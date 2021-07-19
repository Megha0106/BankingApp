import React from 'react'
import {View,Text,ScrollView,Image,StyleSheet,ImageBackground} from 'react-native'

import {Button,IconButton} from 'react-native-paper'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Customers from './Customers'




export default function  HomeScreen({navigation}) {
    return(
        <View style = {styles.containerStyle}>
             <ImageBackground
            source = {require('./asset/background.jpg')}
            style = {{width:'100%', height:'100%',resizeMode:'cover',flex:1}}
            > 
            <Text style = {styles.welcomeStyle}>W E L C O M E !</Text>
           
                <Image
                    source = {require('./asset/MSSLogo.png')}
                    style = {{width:300,height:300,alignSelf:'center',marginTop:50,borderColor:"#000000",borderWidth:3,borderRadius:150}}
                />
               
                <Button style = {styles.btnStyle} mode = "contained" icon = "account-multiple" labelStyle = {{fontSize:35}}
                onPress = {()=>navigation.navigate("Customers")}
                >
                    <Text style = {{fontSize:20}}>All Customers</Text>
                   
                </Button> 
                 
               
               
        </ImageBackground>    
        </View>
       
    )
    
}

const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
        alignItems:'center',   
    },
    welcomeStyle:{
        color:"#fff",
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:10,
        alignSelf:'center',
        fontStyle:"italic",
        textDecorationLine: 'underline',
    },
   
    btnStyle:{
        backgroundColor:"#0000ff",
        marginTop:100,
        marginHorizontal:50,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'blue',
      
    },

   
})