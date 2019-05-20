import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import Ellipsis from './Ellipsis';
import { Card, Icon, Button } from 'react-native-elements';
import { universalstyles } from './UniversalStyles';
import { testPublicInternet } from '../Functions/conductTest';

export default class GoogleTest extends Component{
	constructor(){
		super()
		this.state={
			TestStatus: 'pending',
			publicInternetTime: 0,
			publicInternetSpeed: 0,
		}
		this.fade = new Animated.Value(0)
		this.position = new Animated.Value(-100)
	}

	componentDidMount(){
		testPublicInternet()
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
		const TestResults = (this.state.TestStatus=='pending') ? (
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
					<Text style={styles.cardTitle}>Internet Connection 1</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.publicInternetTime}ms{"\n"}</Text>
						<Text style={styles.bold}>Speed : </Text><Text>{this.state.publicInternetSpeed} Mbps{"\n"}</Text>
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