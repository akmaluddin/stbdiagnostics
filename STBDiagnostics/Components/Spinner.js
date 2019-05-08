import React, { Component, Fragment } from 'react';
import { Text, View, Animated, Easing, Image, StyleSheet } from 'react-native';


export default class Spinnner extends Component {
	constructor(){
		super()
		this.spinValue = new Animated.Value(0)
	}

	componentDidMount () {
		this.spin()
	}

	spin () {
	this.spinValue.setValue(0)
	Animated.timing(
		this.spinValue,
		{
			toValue: 2,
			duration: 2000,
			easing: Easing.quad,
			useNativeDriver: true
		}
		).start(() => this.spin())
	}

	render(){
		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		})
		return(
			<Fragment>
				<Animated.Image
				style={{
					width: 20,
					height: 20,
					transform: [{rotate: spin}] }}
					source={require('../assets/loader.png')}
				/>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create({
})

