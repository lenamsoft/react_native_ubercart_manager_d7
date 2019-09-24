import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    AsyncStorage,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import * as auth from '../../utils/DrupalAuth';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
//const BG_IMAGE = require('../../../assets/bg_screen1.jpg');


export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            login_failed: false,
            showLoading: false,
            error: null,

        };
    }

   

    async _onValueChange(item, selectedValue) {
            try {
                await AsyncStorage.setItem(item, selectedValue);
            } catch (error) {
                console.log('AsyncStorage error: ' + error.message);
            }
        }



        isValid() {
            const { username, password } = this.state;
            let valid = false;

            if (username.length > 0 && password.length > 0) {
                valid = true;
            }

            if (username.length === 0) {
                this.setState({ error: 'You must enter an user name' });
            } else if (password.length === 0) {
                this.setState({ error: 'You must enter a password' });
            }

            return valid;
        }


    submitLoginCredentials() {

        if (this.isValid()) {
            // do stuff
            this.setState({
                showLoading: true,
            });

            const { username, password, showLoading, error } = this.state;

            var formBody = [];
            formBody.push("username=" + username);
            formBody.push("password=" + password);

            formBody = formBody.join("&");

            var site_url = 'http://d7.lenamsoft.com/app_api/login';
            
            fetch(site_url, {
                    method: "POST",
                    body: formBody,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
                })
                .then((response) => response.json())
                .then((responseData) => {
                    //alert(JSON.stringify(responseData));
                    
                    if(responseData.status == 200) {
                      this._onValueChange('userToken', responseData.token);
                      this._onValueChange('username', username);
                      this._onValueChange('password', password);
                      this.props.navigation.navigate('App');
                    }
                    else {
                      this.setState({ error: responseData.message });
                    }

                })
                .catch(err => {
                    this.setState({ error: err });
                    console.log('There was an error:' + err);

                    this.setState({
                        showLoading: false,
                    });
                });

            


        }
    }


    render() {

        const { username, password, showLoading, error } = this.state;

        return (


            <View style={styles.container}>
       
          <View style={styles.loginView}>
          
            <View style={styles.loginTitle}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.travelText}>TRAVEL</Text>
                <Text style={styles.plusText}>+</Text>
              </View>
              <View style={{ marginTop: -10 }}>
                <Text style={styles.travelText}>LEISURE</Text>
              </View>
            </View>
            <View>
            
                <Text style={styles.error}>{this.state.error}</Text>
            
            </View>
            <View style={styles.loginInput}>
              <Input
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    color="rgba(171, 189, 219, 1)"
                    size={25}
                  />
                }
                containerStyle={{ marginVertical: 10 }}
                onChangeText={username => this.setState({ username })}
                value={username}
                inputStyle={{ marginLeft: 10, color: 'white' }}
                secureTextEntry={false}
                keyboardAppearance="light"
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                ref={input => (this.usernameInput = input)}
                blurOnSubmit={true}
                placeholderTextColor="white"
               
                
              
              />
              
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="font-awesome"
                    color="rgba(171, 189, 219, 1)"
                    size={25}
                  />
                }
                containerStyle={{ marginVertical: 10 }}
                onChangeText={password => this.setState({ password })}
                value={password}
                inputStyle={{ marginLeft: 10, color: 'white' }}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                ref={input => (this.passwordInput = input)}
                blurOnSubmit={true}
                placeholderTextColor="white"
              />
            </View>
            <Button
              title="LOG IN"
              activeOpacity={1}
              underlayColor="transparent"
              onPress={this.submitLoginCredentials.bind(this)}
              loading={showLoading}
              loadingProps={{ size: 'small', color: 'white' }}
              buttonStyle={{
                height: 50,
                width: 250,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{ marginVertical: 10 }}
              titleStyle={{ fontWeight: 'bold', color: 'white' }}
            />
            
            
             <View style={styles.container}>
                <Button title="Sign in with QR code!" />
            </View>
            
            
      
          </View>
        
    </View>


        );



    }



}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0000ff',

    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginView: {
        marginTop: 50,
        backgroundColor: 'transparent',
        width: 250,
        height: 400,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: 'white',
        fontSize: 30,
    },
    plusText: {
        color: 'white',
        fontSize: 30,

    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerView: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});