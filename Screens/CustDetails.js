import React ,{useState} from 'react'
import {View,Text,ImageBackground,Image,StyleSheet,Modal,FlatList, Alert} from 'react-native'
import { Title,Card,Button } from 'react-native-paper'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MSIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import NewCust from './NewCust'
import Transaction from './Transaction' 
import Customers from './Customers'


export default function CustDetails({navigation,route}){

   /*  Receiving data from props */
   const{_id, Name, AccNo, Picture,PhoneNo, Balance, Address } = route.params.item


   //delete customer
   const deleteCustomer = ()=>{
       fetch("http://db5cd47bb8a9.ngrok.io/delete",{
           method:"post",
           headers:{
            'Content-Type': 'application/json'
           },
           body:JSON.stringify({
               _id
           })
       }
       )
       .then(res=>res.json())
       .then(deletedCust=>{
           Alert.alert("Deleted successfully")
           navigation.navigate(Customers)
       })
       .catch(err=>{
           Alert.alert("Something went wrong")
       })
   }
    

    return(
        <View style = {styles.containerStyle}>

             <ImageBackground
            source = {require('./asset/background.jpg')}
            style = {{width:'100%', height:'100%'}}
            > 

            <Image
             source = {{uri:Picture}}
             style = {styles.imgStyle}
            />

             <Title style = {styles.nameStyle}>{Name}</Title>
             <Text style = {styles.accNoStyle}>Account No: {AccNo}</Text>
         
            <Card style = {styles.cardStyle}>
                <View style = {{flexDirection :'row'}}>
                    <FIcon
                    name = "phone"
                    color = "blue"
                    size = {33}
                    />
                    <Text style = {styles.textStyle}>
                        {PhoneNo}
                    </Text>
                </View>
            </Card>     
            <Card style = {styles.cardStyle}>
                <View style = {{flexDirection :'row'}}>
                    <MIcon
                    name = "location-pin"
                    color = "blue"
                    size = {33}
                    />
                    <Text style = {{marginLeft:10,fontSize:20}}>
                       {Address}
                    </Text>
                </View>
            </Card>     
            <Card style = {styles.cardStyle}>
                <View style = {{flexDirection :'row'}}>
                    <FIcon
                    name = "rupee"
                    color = "blue"
                    size = {33}
                    style = {{marginLeft:5}}
                    />
                    <Text style = {styles.textStyle}>
                        {Balance}
                    </Text>
                </View>
            </Card> 


            <View style = {styles.btnViewStyle}>
                <Button mode = "contained" 
                icon = "update" 
                style = {{backgroundColor:"#006aff", borderRadius:20,borderWidth:1,borderColor:'blue'}}
                onPress = {()=>{
                    
                    navigation.navigate("NewCust",{_id, Name, AccNo, Picture,PhoneNo, Balance, Address })}
                }
                >
                    Update
                </Button>
                <Button mode = "contained" 
                icon = "delete" 
                style = {{backgroundColor:"#f5313b", borderRadius:20,borderWidth:1,borderColor:'red'}}
                onPress={()=>deleteCustomer()}
                >
                    Delete
                </Button>
            </View>

            <Button mode = "contained" 
            style = {{backgroundColor:"#27a31c", borderRadius:30,borderWidth:1,borderColor:'green',alignSelf:'center',marginTop:20}}
            onPress = {()=>{
                
                navigation.navigate("Transaction",{_id, Name, AccNo, Picture,PhoneNo, Balance, Address })}
            }
            >
               <MSIcon name = "bank-transfer"color  = {'#fff'} size = {30} />
               <Text style = {{fontSize:15,marginLeft:5}}>New Transation</Text>
            </Button>
            </ImageBackground>
        </View>
       
    )
}


const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
    },
    imgStyle:{
        width:150,
        height:150,
        borderRadius:75,
        marginTop:20,
        alignSelf:'center',
    },
    nameStyle:{
        alignSelf:'center',
        fontSize:25,
        fontWeight:'bold',
        color:"#000",
        textDecorationLine:'underline',
        
    },
    accNoStyle:{
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20
    },
    cardStyle:{
        margin:10,
        padding:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#fff'
    },
    textStyle:{
        fontSize:20,
        marginLeft:20
    },
    btnViewStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20
    },
    modalStyle:{
        position:'absolute',
        bottom:2,
        borderWidth:3,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderColor:'#fff',
      backgroundColor:"#e3e5e8",
        width:"100%",
    },
    modalCardStyle:{
        marginTop:3,
        marginHorizontal:10,
        padding:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#e3e5e8',
        backgroundColor:"#e3e5e8"
    }
  
})