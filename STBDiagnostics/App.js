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
import { pingTest, deviceInfo, pingIP } from './Functions/TestSequence';
import { universalstyles } from './Components/UniversalStyles';
import { NetworkInfo } from 'react-native-network-info';
import {pdlSpeedTest} from './Functions/conductTest';
import NetInfo from "@react-native-community/netinfo";

type Props = {};
export default class App extends Component<Props> {
  constructor(){
    super()
    this.state={
      MoreInfo: false,
      ReloadTest: true,
      googleIp: null,
      csdsIp: null,
      googlePing: null,
      csdsPing: null,
      pdlIp: null,
      pdlPing: null,
      deviceConnectionType: null,
      publicIp: null,
      ipv4addr: null,
      gateway: null,
      speedRuns: [],
      currentSpeed: 0,
      averageSpeed: 0,
    }
    this.handleCallbackSetState = this.handleCallbackSetState.bind(this)
  }

  componentDidMount(){
    this.runTest()
  }

  async runTest() {
    var speedRuns = []
    this.setState({
      ...this.state,
      ReloadTest: true 
    })
    pingTest()
      .then(response=>{
        this.setState({
          ...this.state,
          ...response
        })
      })
    deviceInfo()
      .then(response=>{
        this.setState({
          ...this.state,
          ...response,
        })
      })

    NetInfo.getConnectionInfo().then((connectionInfo) => {
    console.log(
    'Initial, type: ' +
    connectionInfo.type +
    ', effectiveType: ' +
    connectionInfo.effectiveType,
    );
    });

    NetworkInfo.getIPV4Address(response => {  
        this.setState({
          ...this.state,
          ipv4addr: response
        })
      })

    NetworkInfo.getBroadcast(response => {
        this.setState({
          ...this.state,
          gateway: response
        })
        pingIP(this.state.gateway)
          .then(response=>{
            console.log(response)
          })
      })


    try {
      for (var i = 0; i < 10; i++){
        var speed = await pdlSpeedTest()
        speedRuns.push(Number(speed.SpeedTestSpeed))
        console.log(speed.SpeedTestSpeed)
        this.setState({
          ...this.state,
          currentSpeed: speed.SpeedTestSpeed,
          averageSpeed: speed.SpeedTestSpeed/10 + this.state.averageSpeed,
        })
      }
      this.setState({
        ...this.state,
        ReloadTest: false,
        speedRuns: speedRuns,
      })
      console.log(speedRuns)
    } catch(error) {

    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.ReloadTest!=this.state.ReloadTest && this.state.ReloadTest){
      this.runTest()
    }
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
        <StartPage state={this.state} callback={this.handleCallbackSetState}/>
        <FooterNavigator callback={this.handleCallbackSetState} state={this.state}/>
      </View>
    );
  }
}

const styles = StyleSheet.create(universalstyles);
