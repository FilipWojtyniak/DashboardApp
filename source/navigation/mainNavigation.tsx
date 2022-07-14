import React, {FC, useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {getAuth} from 'firebase/auth';
import AppStack from "./appStack";
import AuthStack from "./authStack";

const auth = getAuth();

const MainNav : FC = () => {
    const [user, setUser] = useState<any>(null);

    const bootstrap = () =>{
        
        auth.onAuthStateChanged(user =>{
            if(user){
                setUser(user);
            }
        })
};

    useEffect(() =>{
        bootstrap()
    },[]);

    return(
        <NavigationContainer>
            {user !== null ?  <AppStack/> : <AuthStack/>  }
        </NavigationContainer>
    );
};

export default MainNav;
