/**
 * Start Page to host and arrange UI Components
 * 
 */

import React, { Component, Fragment} from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules, ScrollView} from 'react-native';
import {universalstyles} from '../Components/UniversalStyles';
import SummaryTest from './SummaryTest';
import MoreInfo from './MoreInfo';

export default class StartPage extends Component {
	constructor(){
		super()
	}

	render(){
		const renderPage = (this.props.state.MoreInfo) ? (<MoreInfo state={this.props.state}/>) : (<SummaryTest state={this.props.state} callback={this.props.callback}/>)
		return(
			<Fragment>
				{renderPage}
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)