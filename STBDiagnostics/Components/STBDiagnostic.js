import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import Spinner from './Spinner';

export default class STBDiagnostic extends Component {
	constructor(){
		super()
		this.state={
			deviceIP: '175.136.252.205',
			loadedDevice: false,
			loadedTest: false,
		}
	}

	render(){
		const deviceInfo = (this.state.loadedDevice) ? (
				<Fragment>
					<Text style={styles.cardTitle}>Device information</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Your IP : </Text><Text>{this.state.deviceIP}</Text>
					</Text>
				</Fragment>
			) : (
				<Fragment>
					<View style={{
						alignItems: 'center'
					}}>
						<Text style={styles.cardTitle}>Obtaining Device Info</Text>
						<Spinner/>
					</View>
				</Fragment>
			)

		const test = (this.state.loadedTest) ? (
				<Fragment>
					<Text style={styles.cardTitle}>Device information</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Your IP : </Text><Text>{this.state.deviceIP}</Text>
					</Text>
				</Fragment>
			) : (
				<Fragment>
					<View style={{
						alignItems: 'center'
					}}>
						<Text style={styles.cardTitle}>Conducting Test</Text>
						<Spinner/>
					</View>
				</Fragment>
			)

		return(
			<Fragment>
				<Card
					containerStyle={styles.card}
				>
					{deviceInfo}
				</Card>

				<Card
					containerStyle={styles.card}
				>
					{test}
				</Card>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		borderWidth: 0
	},
	cardTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	cardContent: {
		fontSize: 10,
	},
	bold: {
		fontWeight: 'bold'
	},
})