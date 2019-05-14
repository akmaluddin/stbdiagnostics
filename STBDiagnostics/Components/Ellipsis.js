import React, { Component, Fragment } from 'react';
import { Image } from 'react-native';

export default class Ellipsis extends Component {
	render(){
		const type = (this.props.color=='light') ? 
		(
			<Image
				style={{width: 40, height: 40}}
				source={require('../assets/EllipsisLight.gif')}
			/>
		) :
		(
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