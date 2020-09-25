import React, { Component, } from "react";
import { Dimensions, StyleSheet, ScrollView, View, TextInput, ImageBackground, Text, Image, ToastAndroid } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchScheduleMeeting, createMeeting } from '@action';
import firestore from '@react-native-firebase/firestore';
import { Loader, Header } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import { Join, Create, customAlert, DefButton } from '@common';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment';
import theme from '@theme';
import { RFValue } from "react-native-responsive-fontsize";
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
class ScheduleMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      participents: [],
      time: '',
      date: '',
      startDate: '',
      endDate:'',
      duration: '',
      meetingID: '',
      loading: false,
      selectedUsers: [],
      showStartTime: false,
      startTime: new Date(),
      setStartTime: '',
      showEndTime: false,
      endTime: new Date(),
      setEndTime: '',
      meetingTitle:'',
      agenda:''
    };
   
  }

  UNSAFE_componentWillReceiveProps(props){
    const {selected} = props.route.params;
    console.log("selected => ",selected);
    this.setState({
      selectedUsers: selected
    });
    let names = [];
    selected.forEach(e => {
      names.push(e.name)
    })

    this.setState({participents: names})
  }

  async scheduleMeeting() {
    this.setState({loading:true});
    const { meetingID, agenda, startDate, endDate, setStartTime, setEndTime, selectedUsers, meetingTitle } = this.state;
    // this.setState({ loading: true });
    if(meetingID === ""){
      this.setState({loading:false});
      ToastAndroid.show("Meeting id Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(agenda === ""){
      this.setState({loading:false});
      ToastAndroid.show("agenda Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(startDate === ""){
      this.setState({loading:false});
      ToastAndroid.show("Start Date Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(endDate === ""){
      this.setState({loading:false});
      ToastAndroid.show("End Date Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(setStartTime === ""){
      this.setState({loading:false});
      ToastAndroid.show("Start time Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(setEndTime === ""){
      this.setState({loading:false});
      ToastAndroid.show("End time Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(selectedUsers === []){
      this.setState({loading:false});
      ToastAndroid.show("Meeting id Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(meetingTitle === ""){
      this.setState({loading:false});
      ToastAndroid.show("Meeting title Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
   
    
    let data = {};
    data = {
      'title': meetingTitle,
      'agenda': agenda,
      'meeting_id':meetingID,
      'participate_id': selectedUsers,
      'meeting_start_date': startDate,
      'meeting_end_date': endDate,
      'starting_time': setStartTime,
      'userType': 'Registered',
      'ending_time': setEndTime,
      'token_code': await AsyncStorage.getItem('userIDToken')
    };

    console.log(data);
    // return true;
    
   const meet = await createMeeting(data);
   customAlert(meet.msg);
   ToastAndroid.show(meet.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM)
   this.setState({loading:false})
   this.props.navigation.navigate('modules', {refresh:true});

  }


  startTime = (event, date) => {
    console.log('-------------------------------------------------------------------------');
    console.log("start time event => ", event);
    console.log("start time date => ", moment(date).format('h:mm:ss a'));
    const time = date.getTime();
    const a = moment(date).format('h:mm:ss a');
    this.setState({
      setStartTime:a,
      showStartTime: false
    });
    return a;
  }

  endTime = (event, date) => {
    console.log('-------------------------------------------------------------------------');
    console.log("end time event => ", event);
    console.log("end time date => ", moment(date).format('h:mm:ss a'));
    const time = date.getTime();
    const a = moment(date).format('h:mm:ss a');
    this.setState({
      setEndTime:a,
      showEndTime:false
    });
    return a;
  }

  render() {
    const { meetingID, subject, participents, time, duration, date, showStartTime, showEndTime, startTime, endTime } = this.state;
    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
        <Header {...this.props} name={"Schedule Meeting"} />
        <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                resizeMode='contain'
                source={require('@assets/Schedule.png')} >
              </Image>
            </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
           
            <Text style={styles.headingText}>Schedule Your Meeting</Text>
          <View style={{width:dw, alignItems:"center", alignContent:'space-around'}}>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="clipboard-outline" type='material-community' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Meeting Title"
                value={this.state.meetingTitle}
                onChangeText={(text) => this.setState({ meetingTitle: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={25} color="#595959" />
            </View>


            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="flag" type='font-awesome' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                value={this.state.meetingID}
                placeholder="Meeting ID"
                onChangeText={(text) => this.setState({ meetingID: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="user" type='font-awesome' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Meeting Participents"
                underlineColorAndroid="transparent"
                value={participents.join(", ")}
                onFocus={() => {
                  this.props.navigation.navigate("ParticipitantList");
                }}
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={25} color="#595959" />
            </View>

            <View style={styles.dateTime}>
              <DatePicker
                style={styles.datePicker}
                date={this.state.startDate}
                mode="date"
                placeholder="Start date"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: styles.dateIcon,
                  dateInput: { marginLeft: 36 }
                }}
                onDateChange={(date) => { this.setState({ startDate: date }) }}
              />
              <View style={styles.datePicker}>
              <TouchableOpacity onPress={() => this.setState({showStartTime:true})}>
                <Text style={styles.timePlaceholder}>
                {this.state.setStartTime != '' ? this.state.setStartTime : 'Start time'}
                </Text>
                </TouchableOpacity>
              {
                showStartTime && <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={this.startTime}
              />
              }
              </View>
             
              
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />

             
            </View>


            <View style={styles.dateTime}>
              
            <DatePicker
                style={styles.datePicker}
                date={this.state.endDate}
                mode="date"
                placeholder="End date"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: styles.dateIcon,
                  dateInput: { marginLeft: 36 }
                }}
                onDateChange={(date) => { this.setState({ endDate: date }) }}
              />
              <View style={styles.datePicker}>
                <TouchableOpacity onPress={() => this.setState({showEndTime:true})}>
                  <Text style={styles.timePlaceholder}>
                    {this.state.setEndTime != '' ? this.state.setEndTime : 'End time'}
                  </Text>
                </TouchableOpacity>
              {
                showEndTime && <DateTimePicker
                testID="dateTimePicker"
                value={endTime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={this.endTime}
              />
              }
              </View>
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="book" type='entypo' size={25} color="#595959" />
              <TextInput
                style={styles.input}
                placeholder="Agenda"
                value={this.state.agenda}
                onChangeText={(text) => this.setState({ agenda: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#595959" />
            </View>
            </View>
          </ScrollView>
          {/* <Button
            buttonStyle={styles.button}
            title="Send"
            onPress={() => { this.scheduleMeeting() }}
            disabled={this.state.email == '' || this.state.pass == ''}
          /> */}
          <View style={styles.buttonSch}>
          <DefButton name={"Schedule".toUpperCase()} callback={() => this.scheduleMeeting()}/>
          </View>
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, { fetchScheduleMeeting })(ScheduleMeeting);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  buttonSch:{
    marginBottom: RFValue(30)
  },
  timePlaceholder:{
    textAlign: 'center',
    marginTop: '8%',
    color: '#adaaaa'
  },
  dateTime:{
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    width:dw/3,
    marginEnd:dw-200,
    marginBottom:20,
    elevation:10
  },
  searchSection: {
    height: 40,
    width: dw/1.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: theme.TITLE,
    shadowOffset: {height: 20, width: 20},
    elevation:10,
    marginBottom:20,
    marginEnd:dw-325
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
    color: '#959595'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  contentContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  scrollView: {
    width: '110%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainer: {
    height: 150,
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  datePicker: {
    height: 40,
    width: '100%',
    borderRadius: 30
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  }
})