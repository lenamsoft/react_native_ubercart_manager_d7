import React from 'react'
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
} from 'react-native'

import { Button } from 'react-native-elements';

export default class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

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