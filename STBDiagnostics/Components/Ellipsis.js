import React, { Component, Fragment } from 'react';
import { Image } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Ellipsis extends Component {
	render(){
		const type = (this.props.color=='light') ? 
		(
			<LottieView source={require('../assets/spinner.json')} autoPlay loop style={{height: 80, width:80}}/>
		) : (this.props.color=='traffic') ?
		(
			<LottieView source={require('../assets/ring.json')} autoPlay loop style={{height: 100}}/>
		) : (this.props.color=='ring') ?
		(
			<LottieView source={require('../assets/ring.json')} autoPlay loop style={{height: 100, zIndex: -1}}/>
		) : (
			<LottieView source={require('../assets/ring.json')} autoPlay loop style={{height: 100}}/>
		)

		return(
			<Fragment>
			{type}
			</Fragment>
		)
	}
}