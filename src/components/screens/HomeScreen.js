import React from 'react'
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'

import { Button } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {    
    this.removeItemValue('userToken');    
    this.props.navigation.navigate('Auth');
  };

  async removeItemValue(key) {
    try {
      await this.AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});