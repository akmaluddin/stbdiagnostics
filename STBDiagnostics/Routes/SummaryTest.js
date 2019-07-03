import React, {Component, Fragment} from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules, ScrollView, Animated, Easing} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import Ellipsis from '../Components/Ellipsis';
import {universalstyles} from '../Components/UniversalStyles';

export default class SummaryTest extends Component {
	constructor(){
		super()
		this.state={
			increment: 0,
			show: 0,
		}
		this.fade = new Animated.Value(0)
		this.fade2 = new Animated.Value(0)
	}

	componentDidMount(){
		Animated.sequence([
			Animated.parallel([
				Animated.timing(                  
					this.fade,            
					{
						toValue: 1,                   
						duration: 500, 
						easing: Easing.exp,             
					}
				),
				Animated.timing(                  
					this.fade2,            
					{
						toValue: 1,                   
						duration: 250, 
						easing: Easing.exp,             
					}
				)
			])
		]).start()

		this.setState({
			...this.state,
			currentSpeed: this.props.state.currentSpeed,
			increment: 0,
			from: 0,
		})
	}

	componentDidUpdate(prevProps){
		if(prevProps.state.currentSpeed != this.props.state.currentSpeed && this.props.state.ReloadTest){
			const _increment = ((this.props.state.currentSpeed - prevProps.state.currentSpeed)/25).toFixed(2)
			this.setState({
				...this.state,
				increment: _increment,
				show: prevProps.state.currentSpeed,
			}, ()=>{
				this.increment()
			})
		}
		else if(prevProps.state.ReloadTest != this.props.state.ReloadTest && !this.props.state.ReloadTest) {
			this.fade2 = new Animated.Value(0)
			Animated.timing(                  
				this.fade2,            
				{
					toValue: 1,                   
					duration: 250, 
					easing: Easing.exp,             
				}
			).start()
			this.setState({
				...this.state,
				increment: 0,
				show: 0,
			})
		}
	}

	increment() {
		const x=20
		for(i = 0; i < x; i++)
		{
			setTimeout(() => {
				this.setState({
					...this.state,
					show: (Number(this.state.show) + Number(this.state.increment)).toFixed(2)
				})
				
				
			}, (1000/x)*(i))
		}
	}

	timeout(){

		
	}

	render(){
		const PendingTest = (this.props.state.ReloadTest) ? (
			<Fragment>
				<Animated.View                 
					style={{
							opacity: this.fade,     
						}}
				>
					<Ellipsis type="vui"/>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-evenly',	
						}}
					>
						<Text style={styles.successTitle}>{this.state.show}</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-evenly',	
						}}
					>
						<Text style={styles.mbpsTitle}>Mbps</Text>
					</View>
				</Animated.View>
			</Fragment>
		) : (
			<Fragment>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>

						<Animated.View                 
							style={{
									opacity: this.fade2,     
								}}
						>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-evenly',	
							}}
						>
							<Text style={styles.mbpsTitle}>Average Speed</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-evenly',	
							}}
						>
							<Text style={styles.successTitle}>{this.props.state.averageSpeed.toFixed(2)}</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-evenly',	
							}}
						>
							<Text style={styles.mbpsTitle}>Mbps</Text>
						</View>
						</Animated.View>
					</View>
			</Fragment>
		)

		return(
			<Fragment>
				<View style={styles.stbdiagnostic}>
					{PendingTest}
				</View>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)