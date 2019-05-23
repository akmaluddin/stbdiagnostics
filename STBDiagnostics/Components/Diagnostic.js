import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules, Animated, Easing} from 'react-native';
import Ellipsis from './Ellipsis';
import { Card, Icon, Button } from 'react-native-elements';
import { universalstyles } from './UniversalStyles';
import { getDeviceInfo, getPublicIp, getDNSResolver } from '../Functions/getDeviceInfo';
import { NetworkInfo } from 'react-native-network-info';

export default class Diagnostic extends Component {
	constructor(){
		super()
		this.state={
			connectionType: null,
			cellularType: null,
			publicIp: null,
			ipv4addr: null,
			gateway: null,
			resolver: null,

			timeResolvePDL: 0,
			timeResolveCSDS: 0,

			deviceStatus: null,
			publicIpStatus: null,
			ipv4addrStatus: null,
			gatewayStatus: null,
			resolverStatus: null,
			overAllTest: null,
		}
		this.fade = new Animated.Value(0)
		this.position = new Animated.Value(-100)
	}

	componentDidMount(){
		this.initTest()
	}

	showAnimations(){
		Animated.sequence([
			Animated.parallel([
				Animated.timing(                  
					this.fade,            
					{
						toValue: 1,                   
						duration: 250,              
					}
				),
				Animated.timing(
					this.position, 
					{
						toValue: 0,
						easing: Easing.linear,
						duration: 120,
					}
				),
			]),
		]).start()
	}

	initTest(){
		this.setState({
			...this.state,
			deviceStatus: null,
			publicIpStatus: null,
			ipv4addrStatus: null,
			gatewayStatus: null,
			resolverStatus: null,
			overAllTest: null
		})

		getDeviceInfo()
			.then(data=>{
				this.setState({
					...this.state,
					connectionType: data.type,
					cellularType: data.effectiveType,
					deviceStatus: true,
				})
			})
			.catch(error=>{
				this.setState({
					...this.state,
					deviceStatus: false,
				})
			})

		getPublicIp()
			.then(data=>{
				this.setState({
					...this.state,
					publicIp: data,
					publicIpStatus: true,
				})
			})
			.catch(error=>{
				this.setState({
					...this.state,
					publicIpStatus: false
				})
			})

		NetworkInfo.getIPV4Address(addr => {
				this.setState({
					...this.state,
					ipv4addr: addr,
					ipv4addrStatus: true,
				})
			})

		NetworkInfo.getBroadcast(addr => {
				this.setState({
					...this.state,
					gateway: addr,
					gatewayStatus: true,
				})
			})

		getDNSResolver()
			.then(response=>{
				this.setState({
					...this.state,
					resolver: response,
					resolverStatus: true,
				})
			})
			.catch(error=>{
				this.setState({
					...this.state,
					resolverStatus: false
				})

			})
		this.resolvePDL()
		this.resolveCSDS()
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

	componentDidUpdate(prevProps, prevState){
		if(prevState!=this.state){
			if(this.state.gatewayStatus && 
				this.state.resolverStatus && 
				this.state.publicIpStatus && 
				this.state.ipv4addrStatus && 
				this.state.deviceStatus &&
				this.state.overAllTest==null
				) {
				this.setState({
					...this.state,
					overAllTest: true
				}, ()=>{
					this.props.resetCallback({
						retestDiagnostic: false
					})
				})
			} 
		}
		if(this.props!=prevProps && this.props.show){
			this.showAnimations()
		} else if (!this.props.show) {
			this.fade = new Animated.Value(0)
			this.position = new Animated.Value(-100)
		}

		if(this.props.retest != prevProps.retest && this.props.retest){
			this.initTest()
		}
	}

	render(){
		const connectionType = (this.state.connectionType == 'wifi') ? (
				<Fragment>
					<Text style={styles.bold}>Connection Type : </Text><Text>Wi-fi{"\n"}</Text>
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

		const TestResults = (this.state.overAllTest) ? (
			<Card
				containerStyle={styles.card}
			>
				<Text style={styles.cardTitle}>Diagnostic Information</Text>
					<Text style={styles.cardContent}>
						{connectionType}
						<Text style={styles.bold}>Local IP : </Text><Text>{this.state.ipv4addr}{"\n"}</Text>
						<Text style={styles.bold}>Public IP : </Text><Text>{this.state.publicIp}{"\n"}</Text>
						{cellularData}
						{resolverIP}
						{Gateway}
						<Text style={styles.bold}>Resolve CSDS : </Text><Text>{this.state.timeResolveCSDS} ms{"\n"}</Text>
						<Text style={styles.bold}>Resolve PDL : </Text><Text>{this.state.timeResolvePDL} ms{"\n"}</Text>
					</Text>
			</Card>
		) : (this.state.overAllTest==null) ? 
		(
			<Card
				containerStyle={styles.pendingCard}
			>
				<View style={{
					alignItems: 'center',
					margin: 10
				}}>
					<Ellipsis type='light'/>
				</View>

			</Card>
		) : (
			<Card
				containerStyle={styles.failedCard}
			>

			</Card>
		)

		const ifShow = (this.props.show) ? (
			<Fragment>
				<Animated.View                 
					style={{
						opacity: this.fade,
						bottom: this.position,         
					}}
				>
					{TestResults}
				</Animated.View>
			</Fragment>
		) : (
			<Fragment/>
		) 

		return(
			<Fragment>
				{ifShow}
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles);