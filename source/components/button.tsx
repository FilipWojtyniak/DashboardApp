import React, {FC} from "react";
import {Text, StyleSheet, Dimensions} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    title: string;
    onPress: ()=>void;
}

const App:FC<Props> = (props) =>{
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default App;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#000',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent:'center',
        padding:10,
        borderRadius: 8,
        paddingHorizontal: 30,
        marginVertical: 10
    },
    text:{
        color:'#fff'
    }
})