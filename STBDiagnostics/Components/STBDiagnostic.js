import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { NetworkInfo } from 'react-native-network-info';
import Spinner from './Spinner';
import { getDeviceInfo, getPublicIp, getDNSResolver } from '../Functions/getDeviceInfo';
import { testIVP, testIVPResponse } from '../Functions/conductTest';

export default class STBDiagnostic extends Component {
	constructor(){
		super()
		this.state={
			publicIp: '',
			connectionType: '',
			cellularType: '',
			ipv4addr: '',
			resolver: '',
			ivpResponseTime: null,
			ivpTestSpeed: null,
			ivpTest: false,
			loadedDevice: false,
			loadedTest: false,
		}

		this.loadDeviceInfo = this.loadDeviceInfo.bind(this)
	}

	loadDeviceInfo(){
		this.setState({
			...this.state,
			publicIp: '',
			connectionType: '',
			cellularType: '',
			ipv4addr: '',
			resolver: '',
			loadedDevice: false,
		})

		getDeviceInfo()
			.then(data=>{
				this.setState({
					...this.state,
					connectionType: data.type,
					cellularType: data.effectiveType,
				})
			})

		getPublicIp()
			.then(data=>{
				this.setState({
					...this.state,
					publicIp: data
				})
			})

		NetworkInfo.getIPV4Address(addr => {
			this.setState({
				...this.state,
				ipv4addr: addr
			})
		})

		getDNSResolver()
			.then(response=>{
				this.setState({
					...this.state,
					resolver: response
				})
			})
	}

	loadIVPTest(){
		this.setState({
			...this.state,
			ivpResponseTime: null,
			ivpTest: false,
		})

		testIVP()
			.then(response=>{
				this.setState({
					...this.state,
					loadedTest: true,
					ivpTest: true,
				})
			})
			.catch(error=>{
				this.setState({
					...this.state,
					loadedTest: true,
					ivpTest: false,
				})
			})

		testIVPResponse()
			.then(response=>{
				this.setState({
					...this.state,
					...response
				})
			})
			.catch(error=>{
				console.log(error)
			})
	}

	componentDidMount(){
		this.loadDeviceInfo()
		this.loadIVPTest()
		
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState!=this.state){
			if(this.state.publicIp && this.state.connectionType && !this.state.loadedDevice && this.state.resolver){
				this.setState({
					...this.state,
					loadedDevice: true
				})
			}
		}
	}

	render(){
		const connectionType = (this.state.connectionType == 'wifi') ? (
				<Fragment>
					<Text style={styles.bold}>Connection Type : </Text><Text>{this.state.connectionType}{"\n"}</Text>
				</Fragment>
			) : (
				<Fragment>
					<Text style={styles.negative}>Please enable wifi Connectivity{"\n"}</Text>
				</Fragment>
			)

		const cellularData = (this.state.cellularType=='unknown') ? (<Fragment/>) : (
				<Fragment>
					<Text style={styles.bold}>Cellular : </Text><Text>{this.state.cellularType}{"\n"}</Text>
				</Fragment>
			)

		const resolverIP = (this.state.resolver) ? (
				<Fragment>
					<Text style={styles.bold}>Resolver IP : </Text><Text>{this.state.resolver}{"\n"}</Text>
				</Fragment>
			) : (
				<Fragment/>
			)

		const IVPTest = (this.state.ivpTest) ? (
				<Fragment>
					<Text style={styles.cardTitle}>IVP Server Connection</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>IVP Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.ivpResponseTime}ms{"\n"}</Text>
						<Text style={styles.bold}>Speed : </Text><Text>{this.state.ivpTestSpeed} Mbps{"\n"}</Text>
					</Text>

					<View style={{
						alignItems: 'center'
					}}>
					<Button
						onPress={()=>{this.loadIVPTest()}}
						buttonStyle={styles.button}
						titleStyle={{
							fontSize:15
						}}
						title="Refresh"
					/>
					</View>
				</Fragment>
			) : (
				<Fragment>
					<View style={{
						alignItems: 'center',
						margin: 10
					}}>
						<Text style={styles.cardTitle}>Pinging IVP Server</Text>
						<Spinner/>
					</View>
				</Fragment>
			)

		const showDeviceLoader = (this.state.loadedDevice) ? (
				<Fragment>
					<Text style={styles.cardTitle}>Device information</Text>
					<Text style={styles.cardContent}>
						{connectionType}
						<Text style={styles.bold}>Public IP : </Text><Text>{this.state.publicIp}{"\n"}</Text>
						{cellularData}
						{resolverIP}
						<Text style={styles.bold}>IPV4 Address : </Text><Text>{this.state.ipv4addr}{"\n"}</Text>

					</Text>

					<View style={{
						alignItems: 'center'
					}}>
					<Button
						onPress={()=>{this.loadDeviceInfo()}}
						buttonStyle={styles.button}
						titleStyle={{
							fontSize:15
						}}
						title="Refresh"
					/>
					</View>
				</Fragment>
			) : (
				<Fragment>
					<View style={{
						alignItems: 'center',
						margin: 10
					}}>
						<Text style={styles.cardTitle}>Obtaining Device Info</Text>
						<Spinner/>
					</View>
				</Fragment>
			) 

		return(
			<Fragment>
				<Card
					containerStyle={styles.card}
				>
					{showDeviceLoader}
					
				</Card>
				<Card
					containerStyle={styles.card}
				>
					{IVPTest}
					
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
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	cardContent: {
		fontSize: 15,
	},
	bold: {
		fontWeight: 'bold'
	},
	positive: {
		fontWeight: 'bold',
		color: 'green',
	},
	negative: {
		fontWeight: 'bold',
		color: 'red',
	},
	button: {
		borderRadius: 20,
		width: 150,
	}
})