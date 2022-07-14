import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "../components";
import { PendingPosts } from "../components";
import firebase from 'firebase/compat/app'

const App : FC = (props) =>{

    const [posts, setPosts] = useState<any>(null);
    
    const fetchPendingPosts = async () => {
        const posts = await firebase.firestore().collection('posts').where('approved', '==', false).get();
        setPosts([...posts.docs])
    }

    useEffect(()=>{
        fetchPendingPosts()
    },[] )

    const onApprove = async(id: string) => {
        const posts = await firebase.firestore().collection('posts').doc(id).get();
        posts.ref.set({approved: true}, {merge: true});
    }

    const onReject = async(id:string) => {
        await firebase.firestore().collection('posts').doc(id).delete();
    }

    return(
        <View style={styles.container}>
            <Button title = 'Back' onPress ={()=>{props.navigation.navigate('home')}}/>
            <Text>Dashboard</Text>
            <View style={{height:'80%'}}>
                <FlatList data={posts} renderItem={({item}) =>
                 <PendingPosts message={item.data().message} timeStamp={item.data().timeStamp} approved={item.data().approved} onApprove={()=> onApprove(item.data().id)} onReject={()=> onReject(item.data().id)} />}/>
            </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})