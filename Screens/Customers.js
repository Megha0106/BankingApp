import React , {useEffect,useState}from 'react'
import {View,Text,StyleSheet,ImageBackground,Image,FlatList,Alert} from 'react-native'
import {Card,FAB} from 'react-native-paper'
import NewCust from './NewCust'
import CustDetails from './CustDetails'
export default function Customers({navigation}){

    const [data,setData] = useState([])
    const[loading,setLoading] = useState(true)

    const fetchData = ()=>{
        fetch("http://db5cd47bb8a9.ngrok.io/")
        .then(res =>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })

    }

    useEffect(()=>{
       fetchData()

    },[])
 

    //render list of customers
    const renderList =((item)=>{
        return(
            <Card style = {styles.cardStyle} onPress = {()=>navigation.navigate("CustDetails",{item})}>
                <View style = {styles.cardViewStyle}>
                   <Image 
                    style = {styles.imgStyle}
                    source = {{uri:item.Picture}}
                   />
                   <View style = {styles.subCardViewStyle}>
                    <Text style = {styles.nameStyle}>
                        {item.Name}
                    </Text>
                    <Text style = {styles.accNoStyle}>
                       Account No:{item.AccNo}
                    </Text>
                   </View>
                   
                </View>
           </Card>
        )
    })


    return(
        <ImageBackground
        source = {require('./asset/background.jpg')}
        style = {{width:'100%', height:'100%'}}
        >
            <FlatList style = {{marginTop:10, marginBottom:5}}
            data = {data}
            renderItem = {({item})=>{
                return renderList(item)
            }}
            keyExtractor = {item=>item._id}
            onRefresh = {()=>fetchData()}
            refreshing = {loading}
        />
            
             <FAB
                style={styles.fabStyle}
                small = {false} 
                icon="plus"
                onPress={() => navigation.navigate(NewCust)}
            />
           
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cardStyle:{

        backgroundColor:"#f0f7f7",
        marginTop:5,
        borderRadius:10,
        marginLeft:10,
        marginRight:10,
        padding:5,
        borderWidth:1,
        borderColor:'white'
    },
    cardViewStyle:{
        flexDirection:'row'
    },
    imgStyle:{
        width:80,
        height:80,
        borderRadius:40
    },
    subCardViewStyle:{
        flexDirection:'column',
        marginLeft:10,
        justifyContent:'center'
    },
    nameStyle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#080270'
    },
    accNoStyle:{
        fontSize:18
    },
    fabStyle: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
        backgroundColor:"#006aff"
      },
})