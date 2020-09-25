import React, { Component, } from "react";
import { StyleSheet, ScrollView, View, TextInput, Dimensions, ImageBackground, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { responsiveHeight, } from "react-native-responsive-dimensions";

import {LINK} from '../config';
import theme from '@theme';
const displayWidth = Dimensions.get('window').width;
export default class NewsDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:  "",
            result: 0,
            resultObject: {},
            selectedNews: props.route.params.selectedNews,
            newsDetails: {}
        }

        const link = LINK+'api/newsby-id';
        console.log('link => ', link);
        const id = new FormData();
        id.append('news_id', this.state.selectedNews);
        fetch(link, {
          method:'POST',
          body:id
        }).then(s =>{
          if(s.status == 200){
            return (s.json())
          }else{
            Alert.alert('Some thing worng');
          }
          
          }).then(s => {
            console.log('status', s['data'][0])
            this.setState({
          newsDetails: s['data'][0]
        })
      }).catch(e => console.log('error => ', e));

        
        

      }

      title = (t) => {
        console.log("title",);
        return t;
        var a = t.split("");
         var length = 15;
         console.log("tittle array => ", a);
         var title = [];
         a.forEach((a, b) => {
           if(b < length){
             title.push(a);
           }
         })
         console.log();
      return title.join("");
       }

      changeValue = async (text) => {
        this.setState({
            value: text
        });

        

        if(text.length > 3){
        
          
        }
      }

      DefaultScroll = () => {
        if(this.state.result === 0){
            return (<Text style={{ fontSize: 30, color: 'white' }}>No Data Found</Text>);
        }else{
            return null;
        }
      }


      Article = () => {
        const {newsDetails} = this.state;
        return (
          
            <View style={{ backgroundColor: 'white', width: 319, flex: 1, borderWidth: 2, borderRadius: 20, shadowColor: 'black', shadowOpacity: 10, flexDirection: 'column' }}>
                           <ScrollView>

            <Image 
            source={require('@assets/scooter.jpg')}
            style={{ width: 315, height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20}}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ 
                    fontSize: 20,
                    marginStart: 10,
                    width: '100%'
                 }}>Title
                 {'\n'}
            <Text style={{ color: '#bfbbbb' }}>
                 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                 </Text>
                 </Text>
                 <Text style={{ marginTop: 2,borderRadius: 5, color: 'white', position: 'absolute', zIndex: 99999, backgroundColor: 'orange', marginStart: 280, width: -20 }}>30 Jul</Text>
            </View>
            </ScrollView>

            </View>
        );
      }
    render(){
      const {newsDetails} = this.state;
      console.log('lengt',newsDetails.title);
        return(
            <>
            <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.headerIconStyle}>
                <Icon name="arrow-left" type='material-community' size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <ScrollView contentContainerStyle={styles.scrollView}>

                        <View style={{ 
                          backgroundColor: 'white', 
                          width: displayWidth-5 , 
                          flex: 1, 
                          borderWidth: 0, 
                          shadowColor: 'transparent', 
                          shadowOpacity: 10, 
                          flexDirection: 'column',
                          borderRadius:10,
                          borderBottomLeftRadius:10,
                        }}>
                        <ScrollView>
                        <Image 
                          source={{ uri: LINK+'uploads/'+newsDetails.image }}
                          style={{ width: displayWidth, paddingBottom: 20, height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                          />
                          <View style={{ flex: 1, flexDirection: 'row', marginTop: 50, paddingEnd:20}}>
                          
                              <Text style={{ 
                                  fontSize: 20,
                                  marginStart: 10,
                                  width: '100%'
                                }}>
                                {'\n'}
                                {this.title(newsDetails.title)}
                                {'\n'}
                                <Text style={{
                                 marginTop: 10, 
                                 color: 'white', 
                                 position: 'absolute', 
                                 zIndex: 99999, 
                                 backgroundColor: 'orange', 
                                 marginStart:displayWidth-100, 
                                 width: -20 ,
                                 fontSize:15
                                 }}>
                              {newsDetails.month}
                              </Text>
                                {'\n'}
                                {'\n'}
                          <Text style={{ color: '#bfbbbb', end:10 }}>
                                {newsDetails.details}
                                </Text>
                                </Text>
                          </View>
                          </ScrollView>
                          </View>
              </ScrollView>
            </View>
            <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
              this.props.navigation.navigate('News', {refresh:true})
          }}>

          <Text style={{ color: theme.FONT, top: 10, fontSize: 20, marginStart: -170 }}>| You may also like</Text>
        </TouchableOpacity>
          </ImageBackground>
            </>
        );
    }
}


const styles = StyleSheet.create({
    buttonStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    width: '100%',
    textAlign: 'center',
    marginBottom: '5%',
    height: 50,
    color: 'white'
    },
    CustomTextInput: {
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        width: '80%',
        end: 5,
        top:5,
        start: 30,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
      height: '100%',
      width: '100%',
    },
    searchSection: {
      height: 40,
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
      backgroundColor: 'transparent',
      borderRadius: 5,
    },
    input: {
      width: '100%',
      margin: 0,
      padding: 0,
      marginTop: '0%',
      textAlign: 'left',
      fontSize: 20,
      backgroundColor: '#fff',
      color: '#959595',
      height: '8%',
      fontSize: 20
    },
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    contentContainer: {
      height: '85%',
      width: '100%',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 5,
      borderRadius:10
    },
    scrollView: {
      height: '100%',
      width: '100%',
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
      width: '90%',
      borderColor: 'white',
      borderWidth: 0
    },
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 4,
      marginLeft: 0
    },

    HeaderContainer: {
        top: responsiveHeight(2),
        height: '15%',
        width: '100%',
        zIndex: 100,
        backgroundColor: theme.HEADER_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center'
      },
      headerIconStyle:{ 
        position: 'absolute', 
        left: 20, 
        top: 50 
      }
  })
