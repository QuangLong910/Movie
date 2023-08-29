import * as React from 'react';
import { useEffect,useState } from 'react';



import {Text ,View, StyleSheet,FlatList,Image,Button,ActivityIndicator,RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App() {
  const [data,setdata] = useState([]);
  const [page,setpage] = useState(1);
  const [refreshing,setrefreshing] = useState(true);
 
  useEffect(() => {
    getListSport();
  }, [page]);
  const getListSport = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page='+page)
      .then((res) => {
        return res.json();
     
      })
      .then((listData) => {
        mang = listData;
        setrefreshing(false)
        setdata(mang.results)
        console.log(listData.results);
      })
  }
  const Item = ({title,poster_path,release_date,vote_average}) => (
    <View style={styles.item}>
      <Image   style={styles.imageStyle} source={{uri:'https://www.themoviedb.org/t/p/w220_and_h330_face'+ poster_path}} />
      <View style={styles.viewText}>
      <Text style={styles.text3}>{vote_average}</Text>
      </View>
      <View style={styles.viewText}>
     
      <Text style={styles.text2}>{release_date}</Text>
      <Text style={styles.text}>{title}</Text>
      </View>
    
     
     
    </View>
  );
const  onRefesh = () =>{
  setdata([])
  getListSport()
}
const loadmore = () =>{
  
  setpage(page+1);
  fetch('https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page=' + page)
      .then((res) => {
        return res.json();
     
      })
      .then((listData) => {
        setrefreshing(false)
     
        setdata(listData.results )
        console.log(listData.results);
      })
  
}
  return (
    <SafeAreaView style = {styles.container}>
      {
        refreshing ? 
        <ActivityIndicator/>:
        <FlatList
        onEndReached = {loadmore}
        numColumns = {2}
          data = {data}
          renderItem={({ item }) => <Item title={item.title}  poster_path ={item.poster_path} release_date={item.release_date} vote_average={item.vote_average} />}
          keyExtractor={item => item.id}
          refreshControl = {
          <RefreshControl
         refreshing = {refreshing}
          onRefresh = {onRefesh}
         
          />
          
        }
          
       
         
          
          />
      }
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  item : {
    padding:5,
    width :'50%',
   
  },
  imageStyle:{
    width:'auto',
    height:320,
    borderRadius:10
    
  },
  imageStyle2:{
    width:30,
    height:30,
    borderRadius:50,
    backgroundColor:'red',
    top:10,
    marginLeft:'85%'

    
  },
  viewText:{
    verticalAlign:'bottom',
    position:"absolute",
    bottom:10
    
  },
 
  text:{
    
  left:15,

    
   
    fontSize:17,
    fontWeight:'bold',
    color:'white',
    bottom:10
  
  },
  text3:{
     marginTop:-310,
   
    marginLeft:"85%",
      width:30,
      height:30,
      padding:'auto',
      fontSize:14,
      fontWeight:'bold',
      color:'white',
      textAlign:'center',
     alignItems:'center',
     alignContent:'center',
     
      backgroundColor:'red',
      borderRadius:50
    
    },
  text2:{
   
    left:15,
  
      fontSize:15,
    
      color:'gray',
      bottom:10
    
    }

});
