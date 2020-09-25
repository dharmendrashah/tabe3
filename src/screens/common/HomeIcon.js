import React, {Component} from 'react';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import theme from '@theme';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
export default class HomeIcon extends Component{
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    render(){
        const {callback, image, title, empty} = this.props;
        return (
            <TouchableOpacity onPress={callback ? callback : () => console.log("Specify the call back")}>
            <View style={[styles.centerView, {backgroundColor: empty ? 'transparent' : '#1e7ede'}]}>
                <View style={styles.options}>
                  <Image
                    style={styles.optionImage}
                    resizeMode='contain'
                    source={image ? image : '@assets/transparent.png'} >
                  </Image>
                <Text style={styles.optionsText}>{title ? this.capitalizeFirstLetter(title) : null}</Text>

                </View>
              </View>
              </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: responsiveWidth(20),
        borderRadius: 10,
        height: responsiveHeight(10),
     },
     options: {
        height: responsiveHeight(10),
        width: responsiveHeight(10),
        backgroundColor: theme.HOME_ICON,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
      },
      optionImage: {
        height: '60%',
        width: '60%',
        marginTop:10
      },
      optionsText: {
        width: '100%',
        color: theme.FONT,
        fontSize: RFValue(7),
        color: 'white',
        textAlign: 'center'
      },
    
});