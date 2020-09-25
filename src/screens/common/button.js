import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import theme from '@theme';
export default class DefButton extends React.Component {
    render() {
        const { name,callback, fontSize } = this.props;
        return (
            <TouchableOpacity onPress={callback ? callback : () => {console.log("callback props is required")}}>
                <LinearGradient colors={theme.GRADIENT_COLOR} style={styles.searchSection}>
                        <Text style={[styles.text, {fontSize: fontSize ? fontSize : RFValue(25)}]}>{name ? name : 'name props'.toUpperCase()}</Text>                    
                </LinearGradient>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    searchSection: {
        height: 50,
        width: responsiveWidth(80),
        alignItems: 'center',
        borderColor: '#595959',
        borderRadius: 5,
        overflow: 'hidden',
        alignContent: 'center',
        borderRadius: 30,
    },
    searchIcon: {
        width: 60,
        padding: 10,
    },
    text:{
        marginTop: 7,
        color: 'white',
        alignSelf: 'center',
    }
});
