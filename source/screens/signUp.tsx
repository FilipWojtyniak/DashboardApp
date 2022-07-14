import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Input, Button } from "../components";
import { auth } from "../const/firebase";
import firebase from 'firebase/compat/app';


const App : FC = (props) =>{

    const [name, setName] = useState <string | null> (null);
    const [email, setEmail] = useState <string | null> (null);
    const [password, setPassword] = useState <string | null> (null);

    const signUp = async() => {
        if(name && email && password){
            try{
                const {user} = await auth.createUserWithEmailAndPassword(email, password)
                if(user){
                    await firebase.firestore().collection('users').doc(user.uid).set({name,email,password})
                }
            }catch(error){
                Alert.alert(`${error}`)
            }
        }
        else{
            Alert.alert('Error', 'Missing Fields')
        }

    }

    return(
        <View style={styles.container}>
            <Text>Sign up</Text>
            <Input placeholder="Name" onChangeText={(text)=>{setName(text)}}/>
            <Input placeholder="Email" onChangeText={(text)=>{setEmail(text)}}/>
            <Input placeholder="Password" onChangeText={(text)=>{setPassword(text)}} secureTextEntry={true}/>
            <Button title='Sign Up' onPress={signUp} />
            <View style={styles.loginText}>
                <Text style={{marginHorizontal: 5}}>Already Have an Account</Text>
                <TouchableOpacity onPress={()=> props.navigation.navigate('login')} style={{marginHorizontal: 5}}>
                    <Text style={{color:'rgba(61,135,200,1)'}}>Log in</Text>
                </TouchableOpacity>
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
        
    },
    loginText:{
        flexDirection:'row',
        marginVertical: 20
    }
})