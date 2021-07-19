import React, {useState}from 'react'
import {ImageBackground,StyleSheet,View,Modal,Text,Image,PermissionsAndroid, Alert} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'react-native-image-picker'
import { RESULTS} from 'react-native-permissions'
import Customers from './Customers'

export default function NewCust({navigation,route}){

      //***********Update Customer**************************************** */
      const isNewCust = () =>{
        if(route.params){
          return false
        }
        return true
      }

      const getDetails = (type)=>{
        if(route.params){

          switch(type){
            case "Name":
              return route.params.Name
            case "AccNo":
              return route.params.AccNo
            case "PhoneNo":
              return route.params.PhoneNo
            case "Address":
              return route.params.Address
            case "Balance":
              return route.params.Balance
            case "Picture":
              return route.params.Picture
            
          }
        }
        else{
          return ""
        }
      }

    //data elements
    const[Name, setName] = useState(getDetails("Name"))
    const[AccNo,setAccNo] = useState(getDetails("AccNo"))
    const[PhoneNo, setPhoneNo] = useState(getDetails("PhoneNo"))
    const[Address, setAddress] = useState(getDetails("Address"))
    const[Balance,setBalance] = useState(getDetails("Balance"))
    const[Picture, setPicture] = useState(getDetails("Picture"))
    const[modal, setModal] = useState(false)
    const[addCust,setAddCust] = useState(isNewCust())

    let AccountNo
    

    
   

    //******************************connecting to backend***********************************************************************

    //get latest account number
    const findMax = ()=>{
      fetch("http://db5cd47bb8a9.ngrok.io/findMax",{
        method:'post',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(results=>{
        
         
        let a = parseInt(results[0].AccNo)
        let b = a+1
        AccountNo = b.toString()
        submitData()
        
      })
      .catch(err=>{
        Alert.alert("Something went wrong")
      })
    }

    //save route
    const submitData = ()=>{
      fetch("http://db5cd47bb8a9.ngrok.io/send-data",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          Name,
          AccNo:AccountNo,
          PhoneNo,
          Address,
          Balance,
          Picture,
        })
      }).then(res =>res.json())
      .then(results=>{
        
        Alert.alert("saved successfully")
        navigation.navigate("Customers")
      })
    }

    //update route
    const uploadDetails = ()=>{

      fetch("http://db5cd47bb8a9.ngrok.io/update",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          _id:route.params._id,
          Name,
          AccNo,
          PhoneNo,
          Address,
          Balance,
          Picture,
        })
      }).then(res =>res.json())
      .then(results=>{
        Alert.alert("Updated")
        navigation.navigate("Customers")
      })

    }

  /* ******************************************************* Profile Photo ***********************************************************************/
  //Gallery


  const pickFromGallery= async() =>{

    let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
          
        },
      };

  try{
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
            title:"Gallery Access Permission",
            message:"Apps wants to access your Gallery",
            buttonNeutral:"Ask me later",
            buttonPositive:"OK",
            buttonNegative:"Cancel"
            }
            );

            if(granted == PermissionsAndroid.RESULTS.GRANTED){
                ImagePicker.launchImageLibrary(options, (response) => {
              
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                      console.log('User tapped custom button: ', response.customButton);
                      alert(response.customButton);
                    } else {
                      console.log(response.assets.[0].uri)
                      let newFile = {
                        uri:response.assets.[0].uri,
                        type:`test/${response.assets.[0].uri.split(".")[2]}`, 
                        name:`test/${response.assets.[0].uri.split(".")[2]}`
                       
                      }
                      handleUplaod(newFile)
                    }
                  });
                }

            
            else{
                console.log("Gallery permission denied")
            }
    }
    catch(err){
        console.log(err)

    }
}

//camera

const requestCamera = async () => {

    let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     
        ImagePicker.launchCamera(options, (response) => {
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              const source = { uri: response.uri };
              console.log(response.assets.[0].uri)
             let newFile = {
               uri:response.assets.[0].uri,
               type:`test/${response.assets.[0].uri.split(".")[2]}`, 
               name:`test/${response.assets.[0].uri.split(".")[2]}`
              
             }
             handleUplaod(newFile)
            }
          });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  // upload image
  const handleUplaod = (image) =>{

    const data = new FormData()
    data.append("file",image)
    data.append('upload_preset',"EmployeeApp")
    data.append("cloud_name","meghass")

    fetch("https://api.cloudinary.com/v1_1/meghass/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json()).
    then(data=>{
      
      setPicture(data.url)
      setModal(false)
      
    }).catch(err=>{
      Alert.alert("Error while uploading image")
    })
  }


    return(
      <ImageBackground 
        source = {require('./asset/background.jpg')}
        style = {{width:'100%', height:'100%'}}
        > 
            <View style = {styles.containerStyle}>
           
                <TextInput
                    label="Name"
                    mode = "outlined"
                    style = {styles.inputStyle}
                    theme = {theme}
                    value={Name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Phone No."
                    mode = "outlined"
                    style = {styles.inputStyle}
                    theme = {theme}
                    keyboardType = "phone-pad"
                    value={PhoneNo}
                    onChangeText={text => setPhoneNo(text)}
                />
                <TextInput
                    label="Address"
                    mode = "outlined"
                    style = {styles.inputStyle}
                    theme = {theme}
                    value={Address}
                    onChangeText={text => setAddress(text)}
                />
                <TextInput
                    label="Initial Balance"
                    mode = "outlined"
                    style = {styles.inputStyle}
                    theme = {theme}
                    keyboardType = "number-pad"
                    value={Balance}
                    editable = {addCust}
                    onChangeText={text => setBalance(text)}
                />


                {!route.params && <Button mode = "contained" 
                icon = {Picture == "" ?"upload":"check"} 
                style = {styles.uploadBtnStyle} onPress = {()=>setModal(true)}>
                    Upload Photo
                </Button> }
                


                <View style = {{flexDirection:'row',justifyContent:'space-around',margin:5}}>
                  {route.params?
                  <Button mode = "contained"  style = {styles.saveBtnStyle} onPress = {()=>uploadDetails()}>
                  <Ionicon name = "save"
                      color = {"white"}
                      size = {18}/>
                      <Text style = {{fontSize:18,marginLeft:5}}>Update</Text> 
                      
                  </Button>  
                  :
                  <Button mode = "contained"  style = {styles.saveBtnStyle} onPress = {()=>findMax()}>
                  <Ionicon name = "save"
                      color = {"white"}
                      size = {18}/>
                      <Text style = {{fontSize:18,marginLeft:5}}>Save</Text> 
                      
                  </Button>
                  
                  }                 
                    <Button mode = "contained"  style = {styles.cancelBtnStyle} onPress = {()=>navigation.navigate(Customers)}>
                    <Ionicon name = "close-circle"
                        color = {"white"}
                        size = {20}/>
                        <Text style = {{fontSize:18,marginLeft:5}}>Cancel</Text> 
                        
                    </Button>
                    
                </View>
                
               <Modal 
                animationType = "slide"
                visible = {modal}
                transparent = {true}
                onRequestClose = {()=>setModal(false)}
                >
                    <View style = {styles.modalStyle}>
                        <View style = {styles.modalViewStyle}>
                            <Button mode = "contained" icon = "camera" style = {styles.modalBtnStyle} onPress = {()=>requestCamera()}>
                            Camera
                            </Button> 
                            <Button mode = "contained" icon = "folder-image" style = {styles.modalBtnStyle} onPress = {()=>pickFromGallery()}>
                                Gallery
                            </Button>  
                        </View>
                  
                        <Button mode = "text"  onPress = {()=>setModal(false)}>
                            <Ionicon
                            name = "close"
                            color = {"red"}
                            size = {18}
                            />
                           <Text style = {{color:'red'}}>Close</Text> 
                        </Button> 
                       
                    </View>
                </Modal>
               
            </View>
        </ImageBackground> 
    )
}


const theme = {
    colors:{
        primary:'#0202f0'
    }
}
const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
    },
    inputStyle:{
        margin:5,
        padding:5,
    },
    uploadBtnStyle:{
        margin:10,
        backgroundColor:'#002aff',
        borderRadius:15,
        borderColor:'#006aff',
        borderWidth:1
    },
    modalBtnStyle:{
        margin:10,
        backgroundColor:'#006aff',
        borderRadius:20,
        borderWidth:1,
        borderColor:'blue'
    },
    modalViewStyle :{
        flexDirection :"row",
        alignContent:'center',
        justifyContent:'center'
    },
    modalStyle:{
        position :"absolute",
        bottom:30,
        alignSelf:'center',
       
    },
    saveBtnStyle:{
        backgroundColor:"#38d648",
      
    },
    cancelBtnStyle:{
        backgroundColor:"#f51b43",
      
    },
    imgStyle:{
        width:500,
        height:400,
        alignSelf:'center',
        marginTop:20,
    },
   
})