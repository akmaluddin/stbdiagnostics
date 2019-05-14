import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { NetworkInfo } from 'react-native-network-info';
import Spinner from './Spinner';
import Ellipsis from './Ellipsis';
import { getDeviceInfo, getPublicIp, getDNSResolver } from '../Functions/getDeviceInfo';
import { pdlSpeedTest, testIVPResponse, testPublicInternet, testAstroPDL } from '../Functions/conductTest';

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
			publicInternetTime: null,
			publicInternetSpeed: null,
			pdlTime: null,
			SpeedTestTime: null,
			SpeedTestSpeed: null,

			resultPDL: false,
			resultInternet: false,
			resultIVP: false,
			resultSpeedTest: false,

			timeResolvePDL: null,
			timeResolveCSDS: null,

			pdlStatus: false,
			publicInternetTest: false,
			ivpTest: false,
			speedTest: false,
			loadedDevice: false,
			testResult: false,
			pending: false,
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
			.catch(error=>{
			})

		getPublicIp()
			.then(data=>{
				this.setState({
					...this.state,
					publicIp: data
				})
			})
			.catch(error=>{
			})

		NetworkInfo.getIPV4Address(addr => {
			this.setState({
				...this.state,
				ipv4addr: addr
			})
		})

		NetworkInfo.getBroadcast(addr => {
			this.setState({
				...this.state,
				gateway: addr
			})
		})

		getDNSResolver()
			.then(response=>{
				this.setState({
					...this.state,
					resolver: response
				})
			})
			.catch(error=>{
				console.log(error)
			})
		this.loadAllTest()
		
	}

	loadAllTest() {
		this.setState({
			...this.state,
			testResult: false,
			pending: true,
		})
		this.loadIVPTest()
		this.loadInternetTest()
		this.loadPDLTest()
		this.loadSpeedTest()
		this.resolvePDL()
		this.resolveCSDS()
	}

	loadIVPTest(){
		this.setState({
			...this.state,
			ivpResponseTime: null,
			ivpTestSpeed: null,
			resultIVP: false,
			ivpTest: false,
		})

		testIVPResponse()
			.then(response=>{
				this.setState({
					...this.state,
					...response,
					resultIVP: true,
					ivpTest: true
				})
			})
			.catch(error=>{
				this.setState({
					resultIVP: false,
					ivpTest: true
				})
			})
	}

	loadInternetTest(){
		this.setState({
			...this.state,
			publicInternetTime: null,
			publicInternetSpeed: null,
			publicInternetTest: false,
			resultInternet: false,
		})

		testPublicInternet()
			.then(response=>{
				this.setState({
					...this.state,
					...response,
					publicInternetTest: true,
					resultInternet: true,
				})
			})
			.catch(error=>{
				this.setState({
					...this.state,
					...response,
					publicInternetTest: true,
					resultInternet: false,
				})
			})
	}

	loadSpeedTest(){
		this.setState({
			...this.state,
			SpeedTestTime: null,
			resultSpeedTest: false,
			speedTest: false,
			SpeedTestSpeed: null,
		})

		pdlSpeedTest()
			.then(response=>{
				this.setState({
					...this.state,
					...response,
					speedTest: true,
					resultSpeedTest: true
				})
			})
			.catch(error=>{
				this.setState({
					speedTest: true,
					resultSpeedTest: false,
				})
			})
	}

	loadPDLTest(){
		this.setState({
			...this.state,
			pdlStatus: false,
			resultPDL: false,
			pdlTime: null
		})

		testAstroPDL()
			.then(response=>{
				this.setState({
					...this.state,
					...response,
					resultPDL: true,
					pdlStatus: true
				})
			})
			.catch(error=>{
				this.setState({
					...this.state,
					resultPDL: false,
					pdlStatus: true
				})
			})
	}

	async resolvePDL() {
		const val = await NativeModules.ResolveDNS.test("pdl.astro.com.my")
		this.setState({
			...this.state,
			timeResolvePDL: val.toFixed(2)
		})
	}

	async resolveCSDS() {
		const val = await NativeModules.ResolveDNS.test("csds-astro.astro.com.my")
		this.setState({
			...this.state,
			timeResolveCSDS: val.toFixed(2)
		})
	}

	componentDidMount(){
		this.loadDeviceInfo()
		this.loadIVPTest()
		this.loadInternetTest()
		this.loadPDLTest()
		this.resolvePDL()
		this.resolveCSDS()
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState!=this.state){
			if(this.state.publicIp && this.state.connectionType && !this.state.loadedDevice && this.state.resolver){
				this.setState({
					...this.state,
					loadedDevice: true
				})
			}

			if(!this.state.testResult && this.state.resultInternet && this.state.resultPDL && this.state.resultPDL && this.state.resultSpeedTest){
				this.setState({
					...this.state,
					testResult: true,
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

		const Gateway = (this.state.cellularType=='unknown') ? (
				<Fragment>
					<Text style={styles.bold}>Broadcast Gateway : </Text><Text>{this.state.gateway}{"\n"}</Text>
				</Fragment>
			) : (
				<Fragment/>
			)

		const resolverIP = (this.state.resolver) ? (
				<Fragment>
					<Text style={styles.bold}>Resolver IP : </Text><Text>{this.state.resolver}{"\n"}</Text>
				</Fragment>
			) : (
				<Fragment/>
			)

		const testStatus = (!this.state.loadedDevice) ? (
				<Card
					containerStyle={styles.pendingCard}
				>
					<View style={{
						alignItems: 'center'
					}}>
						<Text style={styles.pendingTitle}>Pending</Text>
						<Spinner/>
					</View>
				</Card>
			):(this.state.testResult) ? (
				<Card
					containerStyle={styles.successCard}
				>
					<Text style={styles.successTitle}>Successful</Text>
					<View style={{
						alignItems: 'center'
					}}>
						<Button
							onPress={()=>{this.loadAllTest()}}
							buttonStyle={styles.successbutton}
							titleStyle={{
								fontSize:15
							}}
							title="Re-Test"
						/>
					</View>
				</Card>
			) : (
				<Card
					containerStyle={styles.failedCard}
				>
					<Text style={styles.failedTitle}>Failed</Text>
					<View style={{
						alignItems: 'center'
					}}>
						<Button
							onPress={()=>{this.loadAllTest()}}
							buttonStyle={styles.failedbutton}
							titleStyle={{
								fontSize:15
							}}
							title="Re-Test"
						/>
					</View>
				</Card>
			)



		const internetTest = (!this.state.publicInternetTest) ? (
				<Fragment>
					<View style={{
						alignItems: 'center',
						margin: 10
					}}>
						<Text style={styles.cardTitle}>Pinging Public Internet</Text>
						<Spinner/>
					</View>
				</Fragment>
				
			) : (this.state.resultInternet) ? (
				<Fragment>
					<Text style={styles.cardTitle}>Internet Connection 1</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.publicInternetTime}ms{"\n"}</Text>
						<Text style={styles.bold}>Speed : </Text><Text>{this.state.publicInternetSpeed} Mbps{"\n"}</Text>
					</Text>
				</Fragment>
			) : (
				<Fragment>
					<Text style={styles.cardTitle}>Internet Connection 1</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.negative}>Failed{"\n"}</Text>
					</Text>
				</Fragment>
			)

		const internetTest2 = (!this.state.pdlStatus) ? (
				<Fragment>
					<View style={{
						alignItems: 'center',
						margin: 10
					}}>
						<Text style={styles.cardTitle}>Pinging Public Internet</Text>
						<Spinner/>
					</View>
				</Fragment>
				
			) : (this.state.resultPDL) ? (
				<Fragment>
					<Text style={styles.cardTitle}>Internet Connection 2</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.pdlTime}ms{"\n"}</Text>
					</Text>
				</Fragment>
			) : (
				<Fragment>
					<Text style={styles.cardTitle}>Internet Connection 2</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.negative}>Failed{"\n"}</Text>
					</Text>
				</Fragment>
			)


		const SpeedTest = (!this.state.speedTest) ? (
				<Fragment>
					<View style={{
						alignItems: 'center',
						margin: 10
					}}>
						<Text style={styles.cardTitle}>Speed Test</Text>
						<Spinner/>
					</View>
				</Fragment>
			) : (this.state.resultSpeedTest) ? (
				<Fragment>
					<Text style={styles.cardTitle}>Speed Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Status : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.SpeedTestTime}ms{"\n"}</Text>
						<Text style={styles.bold}>Speed : </Text><Text>{this.state.SpeedTestSpeed} Mbps{"\n"}</Text>
						<Text style={styles.bold}>Resolve DNS : </Text><Text>{this.state.timeResolvePDL} ms{"\n"}</Text>
					</Text>
				</Fragment>
			) : (
				<Fragment>
					<Text style={styles.cardTitle}>Speed Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>IVP Connectivity : </Text><Text style={styles.negative}>Failed{"\n"}</Text>
					</Text>
				</Fragment>
			)

		const IVPTest = (!this.state.ivpTest) ? (
				<Fragment>
					<View style={{
						alignItems: 'center',
						margin: 10
					}}>
						<Text style={styles.cardTitle}>Pinging IVP Server</Text>
						<Spinner/>
					</View>
				</Fragment>
			) : (this.state.resultIVP) ? (
				<Fragment>
					<Text style={styles.cardTitle}>IVP Server Connection</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>IVP Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.ivpResponseTime}ms{"\n"}</Text>
						<Text style={styles.bold}>Speed : </Text><Text>{this.state.ivpTestSpeed} Mbps{"\n"}</Text>
						<Text style={styles.bold}>Resolve DNS : </Text><Text>{this.state.timeResolveCSDS} ms{"\n"}</Text>
					</Text>
				</Fragment>
			) : (
				<Fragment>
					<Text style={styles.cardTitle}>IVP Server Connection</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>IVP Connectivity : </Text><Text style={styles.negative}>Failed{"\n"}</Text>
					</Text>
				</Fragment>
			)

		const showDeviceLoader = (this.state.loadedDevice) ? (
				<Fragment>
					<Text style={styles.cardTitle}>Device information</Text>
					<Text style={styles.cardContent}>
						{connectionType}
						<Text style={styles.bold}>Local IP : </Text><Text>{this.state.ipv4addr}{"\n"}</Text>
						<Text style={styles.bold}>Public IP : </Text><Text>{this.state.publicIp}{"\n"}</Text>
						{cellularData}
						{resolverIP}
						{Gateway}
						

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
						<Ellipsis color='light'/>
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
				{testStatus}

				<Card
					containerStyle={styles.card}
				>
					{internetTest}
					
				</Card>
				<Card
					containerStyle={styles.card}
				>
					{internetTest2}
					
				</Card>
				<Card
					containerStyle={styles.card}
				>
					{IVPTest}
					
				</Card>
				<Card
					containerStyle={styles.card}
				>
					{SpeedTest}
					
				</Card>
				<Card
					containerStyle={styles.emptyCard}
				/>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		borderWidth: 0
	},
	successCard: {
		borderRadius: 10,
		borderWidth: 0,
		backgroundColor: '#57B56B',
	},
	failedCard: {
		borderRadius: 10,
		borderWidth: 0,
		backgroundColor: '#FF7061',
	},
	pendingCard: {
		borderRadius: 10,
		borderWidth: 0,
		backgroundColor: '#F2E0C9',
	},
	successTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
		color: '#2A6637',
	},
	failedTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
		color: '#B23242',
	},
	pendingTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
		color: '#F2CB57',
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	emptyCard: {
		opacity: 0,
		padding: 20
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
	successbutton: {
		borderRadius: 20,
		width: 150,
		backgroundColor: '#2A6637'
	},
	failedbutton: {
		borderRadius: 20,
		width: 150,
		backgroundColor: '#B23242',
	},
	button: {
		borderRadius: 20,
		width: 150,
	}
})