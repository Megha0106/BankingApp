import React,{useState} from 'react'
import { View,Text, ImageBackground,StyleSheet,Modal, Alert} from "react-native"
import {Button, Title,TextInput,} from 'react-native-paper'
import Ionicon from 'react-native-vector-icons/Ionicons'
import CustDetails from './CustDetails'
export default function Transaction({navigation,route}){


    const[modal1, setModal1] = useState(false)
    const[modal2,setModal2] = useState(false)
    const[modal3, setModal3] = useState(false)
    const[amount, setAmount] = useState("")
    const[AccNo,setAccNo] = useState("")
    let Balance,rBalance, rid

    //************Account Transfer*************

    //fetch details of receiver
    const getDetails = ()=>{
        fetch("http://db5cd47bb8a9.ngrok.io/getDetails",{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                AccNo
            })
        })
        .then(res =>res.json())
        .then(results=>{
        
            rBalance = results.Balance
            rid = results._id
            processAccTrans()
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    //perform calculation of transaction

    const processAccTrans = ()=>{
        let a = parseInt(amount)
        let sb = parseInt(route.params.Balance)
        let rb = parseInt(rBalance)

        if(sb>=a)
        {
            rb = rb + a
            sb = sb -a

            rb = rb.toString()
            sb = sb.toString()

            accountTransfer(rb,rid)
            accountTransfer(sb,route.params._id)

            Alert.alert("Transaction Successful")
            navigation.navigate("Customers")
        }
        else{
            Balance = b;
            Alert.alert("Can't proceed transaction, balance is low")
            navigation.navigate("CustDetails")
        }
    }

    //update in db
    const accountTransfer = (Balance,_id)=>{
        fetch("http://db5cd47bb8a9.ngrok.io/accountTransfer",{
          method:"post",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            _id,
            Balance
          })
        }).then(res =>res.json())
        .then(results=>{
         
        })
        .catch(err=>{
            Alert.alert("Something went wrong")
        })

    }
    
  //****************deposite and withdraw****************************
  //perform calculation
    const process= (type) => {

        let a = parseInt(amount)
        let b = parseInt(route.params.Balance)
        if(type == "d"){
            Balance = a + b

            depositeWithdraw()
        }
        else{
            if(b >= a){
                Balance = b-a;
                depositeWithdraw()
            }
            else{
                Balance = b;
                Alert.alert("Can't proceed transaction, balance is low")
                navigation.navigate("CustDetails")
            }
        }
        
        
    }
    //update in db
    const depositeWithdraw = ()=>{

        fetch("http://db5cd47bb8a9.ngrok.io/depositeWithdraw",{
          method:"post",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            _id:route.params._id,
            Balance
          })
        }).then(res =>res.json())
        .then(results=>{
          Alert.alert("Transaction Successful")
          navigation.navigate("Customers")
        })
    }
   
    return(
        <View style = {styles.containerStyle}>
            <ImageBackground
            source = {require('./asset/background.jpg')}
            style = {{width:'100%', height:'100%'}}
            >
                <View style = {styles.subViewStyle}>

                    <Title style = {styles.titleStyle}>Type Of Transaction</Title>
                  
                   <Button style = {styles.btnStyle} mode = "contained" onPress = {()=>setModal1(true)}>
                       Deposite
                   </Button>
                   <Button style = {styles.btnStyle} mode = "contained" onPress = {()=>setModal2(true)}>
                       Withdraw
                   </Button>
                   <Button style = {styles.btnStyle} mode = "contained" onPress = {()=>setModal3(true)}>
                       Account Tranfer
                   </Button>

                    <Button mode = "text" onPress = {()=>navigation.navigate("CustDetails")}>
                        <Ionicon name = "close" size = {20} color = {"red"}/>
                        <Text style = {{color:'red', fontSize:18}}>Cancel</Text>
                    </Button>

                  {/* Deposite modal */}
                  <Modal
                   animationType = "slide"
                   visible = {modal1}
                   transparent = {true}
                   onRequestClose = {()=>setModal1(false)}
                  >
                      <View style = {styles.modalViewStyle}>
                          <TextInput
                           style = {styles.inputStyle}
                          mode = "flat"
                          label = "Amount"
                           keyboardType = "number-pad"
                           value = {amount}
                           onChangeText={text => setAmount(text)}
                          />
                          <Button mode = "contained" style = {styles.btnStyle} onPress = {()=>process("d")}>
                              Proceed Transaction
                          </Button>
                      </View>
    
                  </Modal>
                 {/* Withdraw modal */}
                  <Modal
                   animationType = "slide"
                   visible = {modal2}
                   transparent = {true}
                   onRequestClose = {()=>setModal2(false)}
                  >
                      <View style = {styles.modalViewStyle}>
                          <TextInput
                           style = {styles.inputStyle}
                          mode = "flat"
                          label = "Amount"
                           keyboardType = "number-pad"
                           value = {amount}
                           onChangeText={text => setAmount(text)}
                          />
                          <Button mode = "contained" style = {styles.btnStyle} onPress = {()=>process("w")}>
                              Proceed Transaction
                          </Button>
                      </View>
    
                  </Modal>
                  {/* Account Transfer Modal */}
                  <Modal
                   animationType = "slide"
                   visible = {modal3}
                   transparent = {true}
                   onRequestClose = {()=>setModal3(false)}
                  >
                      <View style = {styles.modalViewStyle}>
                          <Title style = {styles.titleStyle}>Transfer to:</Title>
                          <TextInput
                           style = {styles.inputStyle}
                          mode = "flat"
                          label = "Account No."
                          value = {AccNo}
                           keyboardType = "number-pad"
                           onChangeText = {(text)=>setAccNo(text)}
                          />
                          <TextInput
                           style = {styles.inputStyle}
                          mode = "flat"
                          label = "Amount"
                           keyboardType = "number-pad"
                           value = {amount}
                           onChangeText = {(text)=>setAmount(text)}
                          />
                          <Button mode = "contained" style = {styles.btnStyle} onPress = {()=>getDetails()}>
                              Proceed
                          </Button>
                      </View>
    
                  </Modal>
               
                </View>

            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({

    containerStyle:{
        flex:1
    },
    subViewStyle:{
        top:'30%',
        bottom:'30%',
        marginHorizontal:20,
        borderRadius:10
    },
    titleStyle:{
        alignSelf:'center',
        textDecorationLine:'underline',
        color:'#080270',
        fontWeight:'bold',
        fontSize:25
    },
    btnStyle:{
        backgroundColor:'#006aff',
        marginVertical:10,
        marginHorizontal:30
    },
    modalViewStyle:{
        position:'absolute',
       top:'60%',
        width:'100%',
        backgroundColor:"#fff"
    },
    inputStyle:{
        margin:10
    }
})