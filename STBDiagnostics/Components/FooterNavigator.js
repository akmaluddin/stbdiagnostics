import React, { Component, Fragment } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import {Platform, StyleSheet, Text, View, Image, NativeModules} from 'react-native';
import {universalstyles} from '../Components/UniversalStyles';

export default class FooterNavigator extends Component {
	constructor(){
		super()
		this.state={
			MoreInfo: false
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.infoState != this.state.MoreInfo){
			this.setState({
				...this.state,
				MoreInfo: this.props.infoState,
			})
		}
	}

	toggleView(){
		this.props.callback({
			MoreInfo: !this.state.MoreInfo
		})
	}


	render(){
		const InfoButton = (this.state.MoreInfo) ? (
			"Hide Info"
		) : (
			"More Info"
		)

		return(
			<Fragment>
				<View style={styles.footerCard}>
					<View style={styles.footerContainer}>
						<Button
							buttonStyle={styles.button}
							titleStyle={styles.buttonText}
							title={InfoButton}
							onPress={()=>{this.toggleView()}}
						/>
						<Button
							buttonStyle={styles.button}
							titleStyle={styles.buttonText}
							title="Reload"
							onPress={()=>{this.toggleView()}}
						/>
					</View>
				</View>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)