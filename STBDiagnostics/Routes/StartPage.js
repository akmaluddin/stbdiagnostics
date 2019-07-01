/**
 * Start Page to host and arrange UI Components
 * 
 */

import React, { Component, Fragment} from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules, ScrollView} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import Ellipsis from '../Components/Ellipsis';
import {universalstyles} from '../Components/UniversalStyles';
import { getDeviceInfo, getPublicIp, getDNSResolver } from '../Functions/getDeviceInfo';

export default class StartPage extends Component {
	constructor(){
		super()
		this.state={
			ReloadTest: false,
			MoreInfo: false,
		}
	}

	componentDidUpdate(prevProps, prevState){
		if (prevProps = this.props){

		}
	}

	render(){
		return(
			<Fragment>
				<View style={styles.stbdiagnostic}>
					<Text>Refactoring Code</Text>
				</View>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)