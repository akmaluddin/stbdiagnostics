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
  render() {
    return (
      <View style={styles.container}>
        <AppHeader/>
        <ScrollView>
          <View style={styles.stbdiagnostic}>
            <STBDiagnostic/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create(universalstyles);
