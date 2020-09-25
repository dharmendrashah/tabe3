import React, { Component } from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image } from 'react-native';
import { Icon, } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { resetData, linkImage,specialLog, fetchScheduleMeeting, authUser, deleteScheduleMeeting, checkUser, getUserData, getMeetings, todayMeetings, nextDayMeetings } from '@action';
import { Loader, Header, DefButton } from "@common";
import theme from '@theme';
class Profile extends Component {

  constructor(props){
    super(props);
    console.log("profile page opened")
    this.state = {
      loggedIn: false,
      userData: {}
    }

    this.checkUserLogin();
    this.authUserData();
  }

  authUserData = async () => {
    const a = await authUser();
    if(a !== false){
      this.setState({userData: a.data});
    }
  }

  async checkUserLogin(){
    const a = await checkUser();
    if (a == true) {
      this.setState({loggedIn:true})
      await this.getUdata()
    }
  }

  getUdata = async () => {
    const a = await getUserdata();
    this.setState({userData: a});
    console.log("'user data => ", a);
  }

  validateINfo(data) {
    const DataInfo = data ? data : 'No info available';
    return DataInfo;
  }

  async logout() {
    AsyncStorage.clear();
    this.props.navigation.navigate('modules', {refresh:true});
    // this.props.resetData()
  }
 
  render() {
    const { getUserProfile, userImagePath } = this.props;
    const {loggedIn, userData} = this.state;

    specialLog(userData);
    if (loggedIn == false) {
      return null;
    }
    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
        <View style={styles.userInfoContainer}>
        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.iconStyle}>
          <Icon name="arrow-left" type='material-community' size={30} color={theme.BACK_ARROW} />
        </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Edit", {refresh:true})} style={styles.imageContainer}>
            <Image
              style={styles.userImage}
              resizeMode='cover'
              source={userData.image !== undefined ? {uri: linkImage(userData.image)} : require('@assets/profile2.png')}  >
            </Image>
            <Icon name={"edit"} />
          </TouchableOpacity>
          <View style={styles.userLoginInfo}>
          <Text style={styles.userLoginInfoText1}>{userData.name}</Text>
          <Text style={styles.userLoginInfoText2}>{userData.email_id}</Text>
          </View>
        </View>
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountInfoHead}>Account Info</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.searchSection}>
              <View style={styles.line}></View>
              <Icon name="user" type='font-awesome' size={20} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>Full Name</Text>
                <Text style={styles.infoText}>{userData.name}</Text>
              </View>
              <Icon name="sliders" type='font-awesome'
                size={20} color="white" />
            </View>
            <View style={styles.searchSection}>
            <View style={styles.line}></View>
              <Icon name="mobile" type='font-awesome'  size={20} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>Phone</Text>
                <Text style={styles.infoText}>{userData.mobile_no}</Text>
              </View>
              <Icon name="sliders" type='font-awesome' size={20} color="white" />
            </View>

            <View style={styles.searchSection}>
            <View style={styles.line}></View>
              <Icon name="envelope-open" type='font-awesome'
                size={15} color="white" />
              <View style={styles.textParentView}>
                <Text style={styles.infoText}>Email Address</Text>
                <Text style={styles.infoText}>{userData.email_id}</Text>
              </View>
              <Icon name="sliders" type='font-awesome' size={20} color="white" />
            </View>
            <DefButton name={"logout".toUpperCase()} callback={() => this.logout()}/>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, { resetData })(Profile);

const styles = StyleSheet.create({
  line:{
    borderWidth: 3,
    height: 50,
    borderColor: theme.TITLE
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchSection: {
    height: 50,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderRadius: 30,
    marginBottom: 10
  },
  userInfoContainer: {
    top: responsiveHeight(2),
    height: '30%',
    width: '100%',
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  imageContainer: {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
    backgroundColor: 'transparent',
    borderRadius: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  userImage: {
    height: responsiveWidth(28),
    width: responsiveWidth(28),
    overflow: 'hidden',
    borderRadius: responsiveWidth(14),
  },
  userLoginInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  navController: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.TITLE,
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    borderRadius: 30,
    top: responsiveHeight(2)
  },
  navText: {
    color: 'blue',
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    right: responsiveWidth(8)
  },
  accountInfoContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  accountInfoHead: {
    color: theme.TITLE,
    fontSize: 25,
    fontWeight: 'bold',
    width: '100%'
  },
  detailsContainer: {
    width: responsiveHeight(45),
    height: responsiveHeight(75),
    alignItems: 'center',
  },
  infoText:{ 
    color: theme.TITLE, 
    fontSize: 15, 
    fontWeight: '400' 
  },
  buttonContainer:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: theme.TITLE, 
    height: responsiveHeight(8), 
    width: responsiveWidth(80), 
    borderRadius: 30, 
    // top: responsiveHeight(2) 
  },
  logOutText:{ 
    color: 'blue', 
    fontSize: 20, 
    fontWeight: '400', 
  },
  userLoginInfoText1:{ color: theme.TITLE, fontSize: 25, fontWeight: 'bold' },
  userLoginInfoText2:{ color: theme.TITLE, fontSize: 17, },
  textParentView:{ width: '75%' },
  iconStyle:{ 
    position: 'absolute', 
    left: 20, 
    top: 30 
  }
})