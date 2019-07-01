/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import AppHeader from './Components/Header';
import StartPage from './Routes/StartPage';
import FooterNavigator from './Components/FooterNavigator';
import STBDiagnostic from './Components/STBDiagnostic';
import { universalstyles } from './Components/UniversalStyles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(){
    super()
    this.state={
      MoreInfo: false,
      ReloadTest: false,
    }
    this.handleCallbackSetState = this.handleCallbackSetState.bind(this)
  }

  handleCallbackSetState(componentState){
    this.setState({
      ...this.state,
      ...componentState,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader/>
        <StartPage/>
        <FooterNavigator callback={this.handleCallbackSetState} infoState={this.state.MoreInfo}/>
      </View>
    );
  }
}

const styles = StyleSheet.create(universalstyles);
