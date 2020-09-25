import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Icon } from 'react-native-elements';
import theme from '@theme';
import { color } from 'react-native-reanimated';
export default class InputBox extends React.Component {
    render() {
        const { val, notEditable, icon, onChangeText, name, fontType, keyboardType, secureTextEntry } = this.props;
        return (
            <View style={styles.searchSection}>
                {/* <Icon style={styles.searchIcon} name={icon} type={fontType ? fontType : 'font-awesome'} size={25} color="#595959" /> */}
                <TextInput
                    style={styles.input}
                    placeholder={name}
                    placeholderTextColor={theme.PLACEHOLDER}
                    onChangeText={(text) => onChangeText(text)}
                    underlineColorAndroid="transparent"
                    keyboardType={keyboardType ? keyboardType : ''}
                    secureTextEntry={secureTextEntry ? true : false}
                    value={val && val}
                    editable={notEditable ? false : true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchSection: {
        height: 40,
        width: responsiveWidth(75),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.TEXT_INPUT_ICON_BACKGROUND_COLOR,
        borderColor: theme.TEXT_INPUT_ICON_BORDER,
        borderRadius: 30,
        overflow: 'hidden',
        shadowOffset:{width: 20, height: 20},
        shadowOpacity: 40,
        shadowColor: '#fff',
        shadowRadius: 30,
        elevation:10
    },
    searchIcon: {
        width: 60,
        padding: 10,
    },
    input: {
        width: '100%',
        margin: 0,
        padding: 0,
        height: '100%',
        textAlign: 'left',
        fontSize: 20,
        backgroundColor: theme.TEXT_INPUT_BACKGROUND,
        color: theme.TEXT_INPUT,
        marginStart: 10
    },
});
