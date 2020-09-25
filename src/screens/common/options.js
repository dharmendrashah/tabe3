import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lis from './Lis';
import config from '../config';

import { customAlert } from '@common';
import { checkUser } from '@action';

export default class Options extends Component{
    render(){
        const {show, callbacks, navigation} = this.props;
        const {REGISTER,LOGIN,FORGOTPASSWORD,SOCIAL} = config.ICON;

        async function register({navigation}) {
            if (await checkUser() === false) {
              navigation.navigate("Register")
            }
            else {
              customAlert('You are already Registered')
            }
          }
        
          async function login({navigation}) {
            if (await checkUser() === false) {
              navigation.navigate("Login")
            }
            else {
              customAlert('You are already Logged in')
            }
          }
        
        
          async function forget({navigation}) {
            if (await checkUser() === false) {
              navigation.navigate("ForgetPassword")
        
            }
            else {
              customAlert('You are already Logged in');
            }
          }
        
          
          async function social({navigation}) {
            if (await checkUser() === false) {
              navigation.navigate("SocialLogin")
            }else {
              customAlert('You are already Logged in')
            }
          }
        
        return(
           
            <View style={s.view}>
            <View style={s.view2}>
                <Lis name={"Register"} icon={REGISTER} callback={() => register(this.props)}/>
                <Lis name={"SignIn"} icon={LOGIN} callback={() => login(this.props)}/>
                <Lis name={"Social Login"} icon={SOCIAL} callback={() => social(this.props)}/>
                <Lis name={"Forgot Password"} icon={FORGOTPASSWORD} callback={() => forget(this.props)}/>
            </View>
            </View>
            
        );
    }
}

const s = StyleSheet.create({
    view:{
        width: dw,
        backgroundColor: 'transparent',
        marginTop:dh/13,
        flexDirection:'row-reverse',
        zIndex:11,
        position:'absolute'

    },
    view2:{
        backgroundColor:"#3f8aec",
        borderRadius:20,
        marginEnd:10,
        zIndex:99999999999999
    },
    opt:{
        marginStart:'10%',
        flexDirection:'row',
        zIndex:12,
        alignContent:'center',
    },
    icon:{
        marginEnd:10,
        marginTop:5
    }
});