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
			<Image
				style={{width: 40, height: 40}}
				source={require('../assets/Traffic.gif')}
			/>
		) : (this.props.color=='ring') ?
		(
			<LottieView source={require('../assets/dna.json')} autoPlay loop style={{height: 100}}/>
		) : (
			<Image
				style={{width: 40, height: 40}}
				source={require('../assets/Ellipsis.gif')}
			/>
		)

		return(
			<Fragment>
			{type}
			</Fragment>
		)
	}
}