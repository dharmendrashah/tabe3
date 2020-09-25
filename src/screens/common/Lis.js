import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import config from '../config';
export default class Lis extends Component{
    render(){
        const {name, icon, callback} = this.props;
        
        return(
            <TouchableOpacity style={s.opt} onPress={callback ? callback : () => console.log("Callback function")}>
                    <Image style={s.image} source={icon ? icon : require("@assets/edit.png")} />
                    <Text style={s.text}>{name ? name : "name"}</Text>
                </TouchableOpacity>
        )
    }
}

const s = StyleSheet.create({
    opt:{
        marginStart:'10%',
        flexDirection:'row',
        zIndex:12,
        alignContent:'center',
        marginTop:5,
        marginBottom:5
    },
    icon:{
        marginEnd:10,
        marginTop:5,
        fontSize:30
    },
    text:{
        fontSize:20,
        color:"#fff"
    },
    image:{
        height:20,
        width:20,
        marginTop:5,
        marginEnd:10
    }
})