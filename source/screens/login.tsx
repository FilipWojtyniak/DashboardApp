import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Input, Button } from "../components";
import { auth } from "../const/firebase";

const App : FC = (props) =>{

    const [email, setEmail] = useState <string | null> (null);
    const [password, setPassword] = useState <string | null> (null);


    const logIn = async() => {
        if(email && password){
            const {user} = await auth.signInWithEmailAndPassword(email,password);
        }
        else{
            Alert.alert('Missing Fields')
        }

    }

    return(
        <View style={styles.container}>
            <Text>Log in</Text>
            <Input placeholder="Email" onChangeText={(text)=>{setEmail(text)}}/>
            <Input placeholder="Password" onChangeText={(text)=>{setPassword(text)}} secureTextEntry={true}/>
            <Button title='Log in' onPress={logIn} />
            <View style={styles.loginText}>
                <Text style={{marginHorizontal: 5}}>Don't have an Account</Text>
                <TouchableOpacity onPress={()=> props.navigation.navigate('signup')} style={{marginHorizontal: 5}}>
                    <Text style={{color:'rgba(61,135,200,1)'}}>Sign Up</Text>
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