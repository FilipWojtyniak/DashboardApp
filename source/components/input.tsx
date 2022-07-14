import React, {FC} from "react";
import {View, StyleSheet, Dimensions} from 'react-native'
import { TextInput } from "react-native-gesture-handler";

const {width} = Dimensions.get('screen');

interface Props {
    placeholder: string;
    onChangeText: (text:string) => void;
    secureTextEntry?: boolean;
}

const App :FC<Props> = (props) => {
    return(
        <View style={styles.container}> 
            <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry || false} onChangeText={props.onChangeText}></TextInput>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container:{
        width: width/1.1,
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginVertical: 10
    },
    input:{
        padding: 15,
    }
})