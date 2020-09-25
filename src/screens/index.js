import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import { Loader } from '@common';
import 'react-native-gesture-handler'
import { fetchUserData } from '@action'
import { connect } from "react-redux";
import { fetchScheduleMeeting, deleteScheduleMeeting, checkUser, getUserData, specialLog } from '@action';

class modules extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.loadApp();
        SplashScreen.hide(); 

       
    }

    

    UNSAFE_componentDidMount() { 
        SplashScreen.hide(); 
    }

    UNSAFE_componentWillReceiveProps(){
        this.loadApp();
    }




    async loadApp() {
        const check = await checkUser();
        specialLog('dasdsadadad  '+check);
        if(check){
            await AsyncStorage.setItem('userLoggedIn', 'true');
            this.props.navigation.navigate('Home', {loggedIn:true})
        }else{
            this.props.navigation.navigate('Home', {loggedIn:false})
        }
    }
    
    render() {
        this.loadApp();
        return (
            <View style={{ flex: 1 }}>
                <Loader />
            </View>
        )
    }
}

export default connect(null, { fetchUserData })(modules);