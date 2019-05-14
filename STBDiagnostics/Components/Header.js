import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

export default class AppHeader extends Component{
	render(){
		return(
			<Header
				centerComponent = {<Image source={require('../assets/AstroLogo.png')} style={{width: 63, height: 25}}/>}
				containerStyle = {styles.header}
			/>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#D9D0C7",
	}
})