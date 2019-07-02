import React, { Component, Fragment } from 'react';
import { Image, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Ellipsis extends Component {
	render(){
		const type = (this.props.type=='light') ? 
		(
			<LottieView source={require('../assets/spinner.json')} autoPlay loop style={{height: 80, width:80}}/>
		) : (this.props.type=='bar') ?
		(
			<LottieView source={require('../assets/wave.json')} autoPlay loop style={{width: '120%'}}/>
		) : (this.props.type=='ring') ?
		(
			<LottieView source={require('../assets/ring.json')} autoPlay loop style={{height: 100, zIndex: -1}}/>
		) : (this.props.type=='vui') ?
		(
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-evenly',	
				}}
			>
				<View
					style={{
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-evenly',	
					}}
				>
					<LottieView source={require('../assets/vui.json')} autoPlay loop style={{height: 600, zIndex: -1, marginBottom: -350}}/>
				</View>
			</View>
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