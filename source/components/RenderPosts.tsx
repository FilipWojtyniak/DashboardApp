import React, {FC} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from ".";

const {width} = Dimensions.get('screen');

interface Props {
    message: string;
    timeStamp: number;
    approved: string;
}

const formatTime=(timeStamp: number) => {
    const calculatedTime = Date.now() - timeStamp;
    if(calculatedTime > 1000) {return `${calculatedTime/1000} s`};
    if((calculatedTime / 1000)>60) {return `${(calculatedTime/1000)/60} min`};
    if(((calculatedTime / 1000)/60)>60) {return `${((calculatedTime/1000)/60)/60} min`};
    if((((calculatedTime / 1000)/60)/60)>24) {return `${(((calculatedTime/1000)/60)/60)/24} d`};
}

const App : FC<Props> = (props) => {
    return(
        <View style={styles.container}>
            <Text>{props.message}</Text>
            <Text>{formatTime(props.timeStamp)}</Text>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container:{
        width: width/1.1,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginVertical: 50,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOffset:{
            width:3,
            height:3
        }
    },


})