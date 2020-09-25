import React from 'react';
import { StyleSheet } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { connect } from 'react-redux';
class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
  }

  componentDidMount() {
    const id = this.props.route.params.meetingID;
    let userInfo = null;
    if (this.props.getUserProfile != null) {
      const { getUserProfile, userImagePath } = this.props;
      userInfo = { displayName: getUserProfile.userName, email: getUserProfile.email, avatar: userImagePath };
    }
    else {
      userInfo = { displayName: 'User', email: 'user@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };
    }

    setTimeout(() => {      
      const url = `https://meetings.tabe3app.com/${id}`;
      JitsiMeet.call(url, userInfo);
    }, 1000);
  }

  async onConferenceTerminated() {
    await JitsiMeet.endCall();
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 1000);
  }

  onConferenceJoined(nativeEvent) {
    / Conference joined event /
  }

  onConferenceWillJoin(nativeEvent) {
    / Conference will join event /
  }

  render() {
    return (
      <JitsiMeetView
        style={styles.container}
        onConferenceJoined={this.onConferenceJoined}
        onConferenceTerminated={this.onConferenceTerminated}
        onConferenceWillJoin={this.onConferenceWillJoin}
      />
    );
  }
}

const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, {})(VideoCall);
const styles = StyleSheet.create({
  container: { flex: 1 }
})