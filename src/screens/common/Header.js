import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import theme from '@theme';
import { RFValue } from "react-native-responsive-fontsize";
class Header extends Component {
  render() {
    const {name} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.iconStyle}>
          <Icon name="arrow-left" type='material-community' size={30} color="white" />
        </TouchableOpacity>
        {
          name ? ( name == 'Schedule Meeting'? <Text style={styles.schedule}>{name}</Text> : <Text style={styles.name}>{name}</Text>):<Image
          style={styles.image}
          resizeMode='contain'
          source={theme.LOGO} >
        </Image>
        }
        
        
       
      </View>
    );
  }
}
export default Header;
const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: 120,
  },
  container: {
    top: responsiveHeight(2),
    height: '15%',
    width: '100%',
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle:{ 
    position: 'absolute', 
    left: 20, 
    top: 10 
  },
  name:{
    fontSize: RFValue(40),
    fontWeight: 'bold'
  },
  schedule:{
    color: theme.TITLE,
    fontSize: RFValue(30),
    marginTop: RFValue(60)
  }
})