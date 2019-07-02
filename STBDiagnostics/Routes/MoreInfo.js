import React, {Component, Fragment} from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules, ScrollView, Dimensions, Animated, Easing} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import Ellipsis from '../Components/Ellipsis';
import {universalstyles} from '../Components/UniversalStyles';
import { getDeviceInfo, getPublicIp, getDNSResolver } from '../Functions/getDeviceInfo';
import { LineChart } from 'react-native-chart-kit';

export default class SummaryTest extends Component {
	constructor(){
		super()
		this.fade = new Animated.Value(0)
		this.position = new Animated.Value(-100)
	}

	componentDidMount(){
		console.log("Mount")
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

	render(){
		const ellipsis = (
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					marginLeft: 20,
					marginRight: 20,
					marginVertical: 60,
					flex: 1,
				}}
			>
				<Ellipsis type="ring"/>
			</View>
		)

		const padding = (
			<View
				style={{
					margin: 20,
				}}
			/>
		)

		const SpeedGraph = (this.props.state.speedRuns.length == 10) ? (
			<Card
				containerStyle={styles.card}
			>
				<Text style={styles.cardTitle}>Speed Test</Text>
					
					<LineChart
						data={{
							labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
							datasets: [{
							data: this.props.state.speedRuns
							}]
						}}
						width={Dimensions.get('window').width-50} // from react-native
						height={220}
						chartConfig={{
							backgroundColor: '#EC008C',
							backgroundGradientFrom: '#FFFFFF',
							backgroundGradientTo: '#FFFFFF',
							decimalPlaces: 2, // optional, defaults to 2dp
							strokeWidth: 2,
							color: (opacity = 1) => `rgba(236, 0, 140, ${opacity})`,
							style: {
								borderRadius: 10,
							}
						}}
						bezier
						style={{
							marginVertical: 8,
							marginLeft: -10,
						}}
				/>
			</Card>
		) : (
			ellipsis
		)

		const DeviceInfo = (this.props.state.deviceConnectionType != null && this.props.state.publicIp != null && this.props.state.ipv4addr != null) ? (
			<Card
				containerStyle={styles.card}
			>
				<Fragment>
					<Text style={styles.cardTitle}>Device Information</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connection Type : </Text><Text>{this.props.state.deviceConnectionType}{"\n"}</Text>
						<Text style={styles.bold}>Public IP : </Text><Text>{this.props.state.publicIp}{"\n"}</Text>
						<Text style={styles.bold}>IPV4 : </Text><Text>{this.props.state.ipv4addr}{"\n"}</Text>
						<Text style={styles.bold}>Gateway : </Text><Text>{this.props.state.gateway}{"\n"}</Text>
					</Text>
				</Fragment>
			</Card>
		) : (
			ellipsis
		)

		const GoogleTest = (this.props.state.googlePing != "Timeout" && this.props.state.googlePing != null) ? (
			<Card
				containerStyle={styles.card}
			>
				<Fragment>
					<Text style={styles.cardTitle}>Google Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>IP : </Text><Text>{this.props.state.googleIp}{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.props.state.googlePing} ms{"\n"}</Text>
					</Text>
				</Fragment>
			</Card>
		) : (this.props.state.googlePing == "Timeout" && this.props.state.googlePing != null) ? (
			<Card
				containerStyle={styles.pendingCard}
			>
				<Fragment>
					<Text style={styles.failedTitle}>Google Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.negative}>Timeout{"\n"}</Text>
						<Text style={styles.bold}>IP : </Text><Text>{this.props.state.googleIp}{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>Timeout{"\n"}</Text>
					</Text>
				</Fragment>
			</Card>
		) : (
			ellipsis
		)

		const CSDSTest = (this.props.state.csdsPing != "Timeout" && this.props.state.csdsPing != null) ? (
			<Card
				containerStyle={styles.card}
			>
				<Fragment>
					<Text style={styles.cardTitle}>CSDS Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>IP : </Text><Text>{this.props.state.csdsIp}{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.props.state.csdsPing} ms{"\n"}</Text>
					</Text>
				</Fragment>
			</Card>
		) : (this.props.state.csdsPing == "Timeout" && this.props.state.csdsPing != null) ? (
			<Card
				containerStyle={styles.pendingCard}
			>
				<Fragment>
					<Text style={styles.failedTitle}>CSDS Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.negative}>Timeout{"\n"}</Text>
						<Text style={styles.bold}>IP : </Text><Text>{this.props.state.csdsIp}{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>Timeout{"\n"}</Text>
					</Text>
				</Fragment>
			</Card>
		) : (
			ellipsis
		)

		const PDLTest = (this.props.state.pdlPing != "Timeout" && this.props.state.pdlPing != null) ? (
			<Card
				containerStyle={styles.card}
			>
				<Fragment>
					<Text style={styles.cardTitle}>PDL Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>IP : </Text><Text>{this.props.state.pdlIp}{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.props.state.pdlPing} ms{"\n"}</Text>
					</Text>
				</Fragment>
			</Card>
		) : (this.props.state.pdlPing == "Timeout" && this.props.state.pdlPing != null) ? (
			<Card
				containerStyle={styles.pendingCard}
			>
				<Fragment>
					<Text style={styles.failedTitle}>PDL Test</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.negative}>Timeout{"\n"}</Text>
						<Text style={styles.bold}>IP : </Text><Text>{this.props.state.pdlIp}{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>Timeout{"\n"}</Text>
					</Text>
				</Fragment>
			</Card>
		) : (
			ellipsis
		)

		return(
			<Fragment>
				<View style={styles.stbdiagnostic}>
					<ScrollView>
						<Animated.View                 
							style={{
								opacity: this.fade,
								bottom: this.position,         
							}}
						>
							{DeviceInfo}
							{GoogleTest}
							{PDLTest}
							{CSDSTest}
							{SpeedGraph}
							{padding}
						</Animated.View>
					</ScrollView>
				</View>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)