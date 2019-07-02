import React, { Component, Fragment } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import {Platform, StyleSheet, Text, View, Image, NativeModules} from 'react-native';
import {universalstyles} from '../Components/UniversalStyles';

export default class FooterNavigator extends Component {
	constructor(){
		super()
	}

	toggleView(){
		this.props.callback({
			MoreInfo: !this.props.state.MoreInfo
		})
	}

	reload(){
		this.props.callback({
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
		})
	}	


	render(){
		const InfoButton = (this.props.state.MoreInfo) ? (
			"Hide Info"
		) : (
			"More Info"
		)

		return(
			<Fragment>
				<View style={styles.footerCard}>
					<View style={styles.footerContainer}>
						<Button
							buttonStyle={styles.button}
							titleStyle={styles.buttonText}
							title={InfoButton}
							onPress={()=>{this.toggleView()}}
						/>
						<Button
							buttonStyle={styles.button}
							titleStyle={styles.buttonText}
							title="Reload"
							onPress={()=>{this.reload()}}
						/>
					</View>
				</View>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)