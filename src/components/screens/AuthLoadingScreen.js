import React from 'react'
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'

// AWS Amplify modular import
import currentAuthenticatedUser from '../../utils/DrupalAuth'

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}> 
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b44666',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
