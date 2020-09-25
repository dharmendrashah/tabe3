import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  FlatList
} from 'react-native';
import { Icon, } from 'react-native-elements';
import Header from '../screens/common/Header'
import firestore from '@react-native-firebase/firestore';
import { Loader, } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import theme from '@theme';
class MeetingHistory extends Component {

  constructor(props) {
    super(props);
    this.state = { data: null, loading: false }
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getHistoryData();
    });
  }

  async getHistoryData() {
   
        this.setState({ loading: false });
  }

  render() {

    const { getUserProfile, userImagePath } = this.props;

    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <Header {...this.props} />

        <View style={styles.container}>


          <ScrollView contentContainerStyle={styles.ScrollView}>
            <Text style={styles.title}>
              Meeting History
            </Text>

            <View style={styles.listView}>
              {this.state.data ? <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => `${index}K`}
                renderItem={({ item }) =>
                  <View style={styles.item}>
                    <View style={styles.imageView}>
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={userImagePath ? { uri: userImagePath } : require('@assets/profile2.png')}>
                      </Image>
                    </View>
                    <View>
                      <Text style={styles.infoText}>{getUserProfile.userName}</Text>
                      <Text style={styles.infoText}>Meeting Id: {item.meetingID}</Text>

                      <Text style={styles.infoText}>{new Date(item.createdAt.toDate()).toDateString()}</Text>


                    </View>
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate("Calling", { meetingID: item.meetingID }) }}
                      style={styles.callButton}>
                      <Icon name="phone-call" type='feather'
                        size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate("Calling", { meetingID: item.meetingID }) }}
                      style={styles.callButton}>
                      <Icon name="video" type='feather'
                        size={30} color="white" />
                    </TouchableOpacity>
                  </View>}
                keyExtractor={item => item.id}
              /> : <Text style={styles.recordText}>No Records!</Text>}
            </View>
          </ScrollView>
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


export default connect(mapStateToProps, {})(MeetingHistory);

const styles = StyleSheet.create({

  image: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 55
  },
  imageView: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    backgroundColor: 'transparent',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listView: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '80%',
    padding: 10
  },
  infoText: {
    color: theme.INFO,
    fontSize: 10,
    textAlign: 'center',

  },
  recordText: {
    color: theme.TITLE,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center'
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.TITLE,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background: {
    flex: 1,
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
  ScrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    backgroundColor: 'transparent',
    padding: 5,
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    height: 70,
    width: '100%',
    margin: 5
  },


})