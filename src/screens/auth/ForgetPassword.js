/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
  ToastAndroid,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { ToastAlert, Header, DefButton, InputBox, customAlert } from "@common";
import {forgotPassword} from '@action';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import theme from '@theme'
class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  async forget() {
    var emailAddress = this.state.email;
    if(emailAddress == ''){
      customAlert("Email address should not be empty");
      return false;
    }
    var a = await forgotPassword(emailAddress);
    ToastAndroid.showWithGravity(
      "Reset password link has been send to youe email",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    )

    this.props.navigation.navigate('modules', {refresh: true})
  }
  render() {
    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.background}>
        <Header {...this.props} name={" "} />
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={require('@assets/forget-pass.png')} >
            </Image>
          </View>
          <Text style={styles.title}>
            {'Forgot Password'.toUpperCase()}
            </Text>
            <InputBox onChangeText={(text) => { this.setState({ email: text }) }} icon={'user'} name={'PhoneNumber/Email Id'} />
          <DefButton name={"Request Password reset".toUpperCase()} fontSize={RFValue(20)}  callback={() => this.forget()}/>
          <View style={styles.lowerView}>
            <Text style={styles.lowerViewText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Register")
            }} style={{ alignItems: 'center', justifyContent: 'center' }} >
              <Text style={styles.text}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Forget

const styles = StyleSheet.create({
  title: {
    color: theme.TITLE,
    fontSize: 25,
    fontWeight: 'bold'
  },
  lowerView: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'transparent'
  },
  image: {
    height: '100%',
    width: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    height: 200,
    width: 250,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  text: {
    color: theme.LINK,
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchSection: {
    height: 45,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#595959',
    borderRadius: 30
  },
  searchIcon: {
    padding: 10,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#5104e0',
    borderRadius: 5,

  },
  input: {
    width: '70%',
    margin: 0,
    padding: 0,
    height: '100%',
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: '#fff',
    color: '#959595',
  },
  lowerViewText: { color: theme.FONT, fontSize: 15 }
})