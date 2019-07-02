import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, Animated, Dimensions, Easing} from 'react-native';
import Ellipsis from './Ellipsis';
import { Card, Icon, Button } from 'react-native-elements';
import { universalstyles } from './UniversalStyles';
import LinearGradient from 'react-native-linear-gradient';

export default class AverageSummary extends Component {
	constructor(){
		super()
		this.state={
			currentSpeed: 0,
			data: [],
			average: 0,
		}
		this.fade = new Animated.Value(0)
		this.paddingTop = new Animated.Value(Dimensions.get('window').height/4)
	}

	componentDidMount(){
		Animated.timing(                  
			this.fade,            
			{
				toValue: 1,                   
				duration: 1000,              
			}
		).start(); 
	}

	componentDidUpdate(prevProps){
		console.log(Dimensions.get('window').height/4)
		if(prevProps.currentSpeed != this.props.currentSpeed && !this.props.retest){
			this.setState({
				...this.state,
				currentSpeed: this.props.currentSpeed,
				data: this.props.data,
				average: this.state.average + Number(this.props.currentSpeed),
			})
		}
		if(prevProps.show != this.props.show && this.props.show){
			this.showAnimations()
		} else if (!this.props.show) {
			this.resetAnimations()
		}
		if(this.props.retest!=prevProps.retest && this.props.retest){
			this.setState({
				...this.state,
				average: 0,
			})
		}
	}

	showAnimations(){
		Animated.timing(
			this.paddingTop, 
			{
				toValue: 10,
				easing: Easing.linear,
				duration: 150,
			}
		).start()
	}

	resetAnimations(){
		Animated.timing(
			this.paddingTop, 
			{
				toValue: Dimensions.get('window').height/4,
				easing: Easing.linear,
				duration: 150,
			}
		).start()
	}

	render(){
		const TestResults = (this.state.data.length == 10) ? (
			<Animated.View                 
				style={{
					opacity: this.fade, 
					paddingTop: this.paddingTop       
				}}
			>
				<View style={{
					alignItems: 'center',
					margin: 2,
					paddingTop: 50,
				}}>
					
					<Text style={styles.mbpsTitle}>Average</Text>
					<Text style={styles.successTitle}>{(this.state.average/10).toFixed(2)}</Text>
					<Text style={styles.mbpsTitle}>Mbps</Text>
			
				</View>
			</Animated.View>
		) : (
			<Animated.View                 
				style={{
					opacity: this.fade,  
					paddingTop: this.paddingTop        
				}}
			>
					<View style={{
						alignItems: 'center',
						margin: 2,
						zIndex: 0,
					}}>
						<Ellipsis type='bar'/>
					</View>
					<View style={{
							alignItems: 'center',
							marginTop: -100,
							zIndex: 2,
						}}
					>
						<Text style={styles.successTitle}>{this.state.currentSpeed}</Text>
						<Text style={styles.mbpsTitle}>Mbps</Text>
					</View>
					
			</Animated.View>
		)

		return(
			<Fragment>
				{TestResults}
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)