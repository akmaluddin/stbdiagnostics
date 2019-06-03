import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, Animated, Easing} from 'react-native';
import Ellipsis from './Ellipsis';
import { Card, Icon, Button } from 'react-native-elements';
import { universalstyles } from './UniversalStyles';
import { LineChart } from 'react-native-chart-kit';
import { AreaChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { pdlSpeedTest } from '../Functions/conductTest';

export default class AverageTest extends Component {
	constructor(){
		super()
		this.state={
			data : [0,0,0,0,0,0,0,0,0,0,0],
			TestStatus: 'pending',
		}
		this.fade = new Animated.Value(0)
		this.position = new Animated.Value(-100)
	}

	componentDidMount(){ 
		this.getSpeed()                  
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

	async getSpeed() {
		var temp = []
		for (var i = 0; i <= 9; i++) {
			try{
				var speed = await pdlSpeedTest()
				temp.push(Number(speed.SpeedTestSpeed))
				this.setState({
					...this.state,
					data: temp,
					TestStatus: 'pending',
				})

			} catch(error) {
				temp.push(0)
				this.setState({
					...this.state,
					data: temp,
					TestStatus: 'failed',
				})
			}
		}

		if(this.state.TestStatus!='failed')
		this.setState({
			...this.speed,
			TestStatus: 'success'
		})
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state!=prevState){
			this.props.callback(this.state.data)
		}
		if(this.props!=prevProps && this.props.show){
			this.showAnimations()
		} else if (!this.props.show) {
			this.fade = new Animated.Value(0)
			this.position = new Animated.Value(-100)
		} 
		if(this.props.retest != prevProps.retest && this.props.retest){
			this.setState({
				data : [0,0,0,0,0,0,0,0,0,0,0],
				TestStatus: 'pending',
			}, ()=>{this.getSpeed()})
			this.props.resetCallback({
				retestSpeed: false
			})
		}
	}

	render(){
		const TestResults = (this.state.TestStatus=='pending') ? (
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
		) : (this.state.TestStatus=='success') ? (
			<Fragment>
				{console.log(this.state.data)}
				<Card
					containerStyle={styles.card}
				>
					<Text style={styles.cardTitle}>Speed Test</Text>
					
					<LineChart
						data={{
							labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
							datasets: [{
							data: this.state.data
							}]
						}}
						width={Dimensions.get('window').width-50} // from react-native
						height={220}
						yAxisLabel={'Mbps '}
						chartConfig={{
							backgroundColor: '#EC008C',
							backgroundGradientFrom: '#FFFFFF',
							backgroundGradientTo: '#FFFFFF',
							decimalPlaces: 0, // optional, defaults to 2dp
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
			</Fragment>
		) : (
			<View
				style={{
					alignItems: 'center',
					margin: 10
				}}
			>
				<Ellipsis/>
			</View>
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

const styles = StyleSheet.create(universalstyles)