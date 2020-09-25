import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground, Text, Image, StatusBar, ToastAndroid, } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { InputBox, Loader, ToastAlert, Header, DefButton } from "@common";
import auth from '@react-native-firebase/auth';
import { connect } from "react-redux";
import { fetchUserData, UserRegister, login } from '@action';
import theme from '@theme';
import { responsiveHeight } from "react-native-responsive-dimensions";

const imageOptions = {
  title: "Select ProfilePic",
  storageOptions: {
    skipBackup: true,
    path: "images"
  },
  maxWidth: 300,
  maxHeight: 300
};
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userImage: '',
      userName: '',
      password: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      pinCode: '',
      loading: false,
      uri: '',
      islogged: '',
      type: '',
      token : '',
      userImageLink: '',
      name: '',
      imageLink: '',
    };
    auth().signInAnonymously();

    console.log("props => ", props.route.params)
  }


  async register() {

    console.log("register button clicked")
    this.onRegister();
  }

  addProfilePic = () => {
    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        // You can also display the image using data:
        console.log("image", response.uri);
        this.setState({imageLink: response.uri});
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ userImage: source, uri: 'data:image/jpeg;base64,' + response.data, userImageLink: response.uri });
      }
    });
  }


  async onRegister(pro) {
    this.setState({loading:true});
    const { password,userName, email, phone, name, imageLink } = this.state;
    const data = {
      'name': name,
      'user_id': userName,
      'mobile_no': phone,
      'email_id': email,
      'password': password,
      'confirm_password': password,
      'userfile': imageLink,
      'registration_type': 'manual'
    };

    const a = await UserRegister(data);
    ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    if(a.status === 1){
      // login the user
      const loginData = {
        user_id: userName,
        password: password
      }
      const log = await login(loginData);
      
      if(log){
        this.props.navigation.navigate('modules',{refresh:true});
        ToastAndroid.showWithGravity("You are sucessfully registered", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }else{
        ToastAndroid.showWithGravity("Credentil are not please check the correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }
      this.setState({loading:false});
    }else{
      this.setState({loading:false});
    }
   


    console.log("register data => ",a);

   
  }




  render() {
    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={theme.STATUS} />
        <Header {...this.props} name={'Sign Up'} />
        <View style={styles.container}>
            <View style={styles.uploadView}>
              <TouchableOpacity style={styles.upload} onPress={this.addProfilePic}>
                {this.state.userImage == '' ? <Icon name="user-o" type='font-awesome' size={40} color="#dcdcdc" />
                  :
                  <Image style={styles.image} resizeMode='cover' source={this.state.userImage} />}
              </TouchableOpacity>
            </View>
          <ScrollView contentContainerStyle={styles.ScrollView}>
          <InputBox onChangeText={(text) => { this.setState({ userName: text }) }} icon={'user'} name={'Username'} keyboardType={'default'} />
          <InputBox onChangeText={(text) => { this.setState({ email: text }) }} icon={'envelope-open'} name={'Email Address'} keyboardType={'email-address'} />
          <InputBox onChangeText={(text) => { this.setState({ phone: text }) }} icon={'phone'} name={'Phone Number'} keyboardType={'numeric'} />
          <InputBox onChangeText={(text) => { this.setState({ name: text }) }} icon={'user'} name={'Name'} keyboardType={'default'} />
            <InputBox onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} name={'Password'} keyboardType={'password'} secureTextEntry={true} />
          <DefButton name={"Sign Up".toUpperCase()} callback={() => this.register()}/>

          </ScrollView>
          <View style={styles.lowerView}>
            <Text style={styles.lowerViewText}>Already have a account?</Text>
            <TouchableOpacity style={styles.loginView} onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.login}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}

export default connect(null, { fetchUserData })(Register);

const styles = StyleSheet.create({

  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  uploadView: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  ScrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
    marginTop: -1
  },
  login: {
    color: theme.LINK,
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  upload: {
    backgroundColor: '#2685e4',
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView: {
    backgroundColor: 'transparent',
    height: 100,
    alignItems: 'baseline',
    justifyContent: 'flex-end'
  },
  lowerView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'transparent'
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    bottom: 0
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300, height: 80,
    backgroundColor: 'transparent',
  },
  container: {
    height: '90%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  lowerViewText:{ color: theme.FONT, fontSize: 15 }
})