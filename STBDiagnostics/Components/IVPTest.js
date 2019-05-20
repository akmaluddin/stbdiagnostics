import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import Ellipsis from './Ellipsis';
import { Card, Icon, Button } from 'react-native-elements';
import { universalstyles } from './UniversalStyles';
import { testIVPResponse } from '../Functions/conductTest';

export default class IVPTest extends Component{
	constructor(){
		super()
		this.state={
			ivpResponseTime: 0,
			ivpTestSpeed: 0,
			TestStatus: 'pending'
		}
		this.fade = new Animated.Value(0)
		this.position = new Animated.Value(-100)
	}

	componentDidMount(){
		testIVPResponse()
			.then(response=>{
				this.setState({
					...this.state,
					...response,
					TestStatus: 'success'
				})
			})
			.catch(error=>{
				this.setState({
					...this.state,
					TestStatus: 'failed'
				})
			})
	}

	showAnimations(){
		Animated.sequence([
			Animated.parallel([
				Animated.timing(                  
					this.fade,            
					{
						toValue: 1,                   
						duration: 500,            
					}
				),
				Animated.timing(
					this.position, 
					{
						toValue: 0,
						easing: Easing.linear,
						duration: 250,
					}
				),
			]),
		]).start()
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props!=prevProps && this.props.show){
			this.showAnimations()
		} else if (!this.props.show) {
			this.fade = new Animated.Value(0)
			this.position = new Animated.Value(-100)
		}
	}

	render(){
		const TestResults= (this.state.TestStatus=='pending') ? (
			<Card
				containerStyle={styles.pendingCard}
			>
				<View style={{
					alignItems: 'center',
					margin: 10
				}}>
					<Ellipsis color='light'/>
				</View>
			</Card>
		) : (this.state.TestStatus=='success') ? (
			<Card
				containerStyle={styles.card}
			>	
				<Fragment>
					<Text style={styles.cardTitle}>IVP Server Connection</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>IVP Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.ivpResponseTime}ms{"\n"}</Text>
					</Text>
				</Fragment>
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

const styles = StyleSheet.create(universalstyles)