import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import Ellipsis from './Ellipsis';
import { Card, Icon, Button } from 'react-native-elements';
import { universalstyles } from './UniversalStyles';
import { testAstroPDL } from '../Functions/conductTest';

export default class PDLTest extends Component {
	constructor(){
		super()
		this.state={
			TestStatus: 'pending',
			pdlTime: null,
		}
		this.fade = new Animated.Value(0)
		this.position = new Animated.Value(-100)
	}

	componentDidMount(){
		testAstroPDL()
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

	componentDidUpdate(prevProps, prevState){
		if(this.props!=prevProps && this.props.show){
			this.showAnimations()
		} else if (!this.props.show) {
			this.fade = new Animated.Value(0)
			this.position = new Animated.Value(-100)
		}
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
					<Text style={styles.cardTitle}>Internet Connection 2</Text>
					<Text style={styles.cardContent}>
						<Text style={styles.bold}>Connectivity : </Text><Text style={styles.positive}>Success{"\n"}</Text>
						<Text style={styles.bold}>Response Time : </Text><Text>{this.state.pdlTime}ms{"\n"}</Text>
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