import React, { Component } from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, StatusBar,ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { InputBox, Loader, ToastAlert, Header, DefButton } from "@common";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import { fetchUserData, login, loginCustom } from '@action'
import { color } from "react-native-reanimated";
import theme from '@theme'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      password: ''
    };
  }

  async login() {
    this.setState({ loading: true });
    this.onSubmit();
  }

  async onSubmit() {
    const { userID, password } = this.state;
    if(userID == ''){
    this.setState({ loading: false });

      ToastAndroid.showWithGravity("User id field is required", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      return false;
    }
    if(password == ''){
    this.setState({ loading: false });

      ToastAndroid.showWithGravity("Password field is required", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      return false;
    }
    var i = {
      user_id:userID,
      password:password
    }
    const log = await login(i);
      
    if(log){
      this.props.navigation.navigate('modules', {refresh:true});
      ToastAndroid.showWithGravity("You are sucessfully registered", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }else{
      ToastAndroid.showWithGravity("Credentil are not please check the correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  }

  render() {
    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={theme.STATUS} />
        <Header name={'Login'} {...this.props} />

        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={require('@assets/forget-pass.png')} >
            </Image>
          </View>
          <Text style={styles.text}>Login</Text>

          <View style={styles.inputMainView}>
            <InputBox onChangeText={(text) => { this.setState({ userID: text }) }} icon={'user'} name={'User Id'} />
            <Text>{'\n'}</Text>
            <InputBox onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} secureTextEntry={true} name={'Password'} />
          </View>
          
          <DefButton name={"Sign In".toUpperCase()} callback={() => this.login()}/>
          <View style={styles.lowerview}>
            <Text style={{ color: theme.FONT, fontSize: 15 }}>Don’t have an account?</Text>
            <TouchableOpacity style={styles.registerBtn} onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={styles.register}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}

export default connect(null, { fetchUserData })(Login);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  register: {
    color: theme.LINK, fontSize: 20, fontWeight: 'bold'
  },
  imageView: {
    height: 200,
    width: 250,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white', fontSize: 25, fontWeight: 'bold'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },
  container: {
    height: '90%',
    paddingTop: 20,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  lowerview: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'transparent'
  },
  inputMainView: {
    height: responsiveHeight(20),
    justifyContent: 'space-around',
    paddingHorizontal: responsiveWidth(1)
   },
  registerBtn:{ alignItems: 'center', justifyContent: 'center' }
})