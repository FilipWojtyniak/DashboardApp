import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { auth } from '../const/firebase'
import { Button, Input, RenderPosts } from "../components";
import firebase from 'firebase/compat/app';


const App : FC = (props) =>{

    const [message, setMessage] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any>(null);


    const fetchPosts = async () => {
        const posts = await firebase.firestore().collection('posts').where('approved', '==', true).get();
        setPosts([...posts.docs])
    }

    const signOut = () => {
        auth.signOut();
        props.navigation.navigate('login');
    };

    const fetchCurrUser = async() => {
        const uid = firebase.auth().currentUser.uid; 
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUser({id: user.id, ...user.data()})}

        useEffect(()=>{
            fetchCurrUser();
            fetchPosts();
        },[])
    

    const post = async() => {
        if(message){
            const data = {
                message,
                timeStamp: Date.now(),
                approved: false
            }
            try {
                await firebase.firestore().collection('posts').add(data)
            } catch (error) {
                console.log(error)
            }

        }
        else{
            Alert.alert('Missing Field')
        }
    };

    return(
        <View style={styles.container}>
            <View style={{flex: 0.5}}>
                {post.length > 0 ? (<FlatList data={posts} renderItem={({item}) =>
                 <RenderPosts message={item.data().message} timeStamp={item.data().timeStamp} approved={item.data().approved} />}/>) : 
                 (
                    <Text>Nothing</Text>
                )
                }           
            </View>
            <Text>Home</Text>
            <Button title ='Sign Out' onPress={signOut}/>
            <View>
                <Input placeholder='Write something' onChangeText={(text)=> {setMessage(text)}}/>
                <Button title='Post' onPress={post}/>
            </View>
            {user ? user.admin ? (
                <View>
                    <Button title='Dashboard' onPress={() => {props.navigation.navigate('dashboard')}}/>
                </View>
            ) : null : null}
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