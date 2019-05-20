import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import Spinner from './Spinner';
import Ellipsis from './Ellipsis';
import { getDeviceInfo, getPublicIp, getDNSResolver } from '../Functions/getDeviceInfo';
import { pdlSpeedTest, testIVPResponse, testPublicInternet, testAstroPDL } from '../Functions/conductTest';
import {universalstyles} from './UniversalStyles';
import GoogleTest from './GoogleTest';
import Diagnostic from './Diagnostic';
import IVPTest from './IVPTest';
import PDLTest from './PDLTest';
import AverageTest from './AverageTest';
import AverageSummary from './AverageSummary';

export default class STBDiagnostic extends Component {
	constructor(){
		super()
		this.state={
			ShowAdvance: false,
			datasets: [],
			currentSpeed: 0,
			retestGoogle: false,
			retestPDL: false,
			retestDiagnostic: false,
			retestSpeed: false,
		}

		this.setDataSets = this.setDataSets.bind(this)
		this.setRetest = this.setRetest.bind(this)
	}

	setDataSets(data){
		//console.log(data[data.length-1])
		this.setState({
			...this.state,
			datasets: data,
			currentSpeed: data[data.length-1],
		})
	}

	setRetest(data){
		this.setState({
			...this.state,
			...data,
		})
	}

	showMoreInfo(){
		this.setState({
			...this.state,
			ShowAdvance: !this.state.ShowAdvance
		})
	}

	reloadTest(){
		this.setState({
			...this.state,
			ShowAdvance: false,
			datasets: [],
			retestGoogle: true,
			retestPDL: true,
			retestDiagnostic: true,
			retestSpeed: true,
		})
	}

	render(){

		const showAdvancedResults = (this.state.ShowAdvance) ? (
				<Fragment>
					<View style={{
						alignItems: 'center',
						margin: 10,
						paddingTop: 10,
					}}>
						<Button
							onPress={()=>{this.showMoreInfo()}}
							buttonStyle={styles.button}
							titleStyle={{
								fontSize:15
							}}
							title="Hide Info"
							ViewComponent={require('react-native-linear-gradient').default}
							linearGradientProps={{
							    colors: ['#FF9800', '#F44336'],
							    start:{x: 0, y: 0}, 
							    end:{x: 4, y: 0}
							}}
						/>
						<Button
							onPress={()=>{this.reloadTest()}}
							buttonStyle={styles.button}
							titleStyle={{
								fontSize:15
							}}
							title="Reload"
							ViewComponent={require('react-native-linear-gradient').default}
							linearGradientProps={{
							    colors: ['#FF9800', '#F44336'],
							    start:{x: 0, y: 0}, 
							    end:{x: 4, y: 0}
							}}
						/>
					</View>
					

				</Fragment>
			) : (
				<View style={{
					alignItems: 'center',
					margin: 10,
					paddingTop: 10,
				}}>
					<Button
						onPress={()=>{this.showMoreInfo()}}
						buttonStyle={styles.button}
						titleStyle={{
							fontSize:15
						}}
						title="More Info"
						ViewComponent={require('react-native-linear-gradient').default}
						linearGradientProps={{
						    colors: ['#FF9800', '#F44336'],
						    start:{x: 0, y: 0}, 
						    end:{x: 4, y: 0}
						}}
					/>
					<Button
						onPress={()=>{this.reloadTest()}}
						buttonStyle={styles.button}
						titleStyle={{
							fontSize:15
						}}
						title="Reload"
						ViewComponent={require('react-native-linear-gradient').default}
						linearGradientProps={{
						    colors: ['#FF9800', '#F44336'],
						    start:{x: 0, y: 0}, 
						    end:{x: 4, y: 0}
						}}
					/>
				</View>
			)

		return(
			<Fragment>
				<AverageSummary data={this.state.datasets} currentSpeed={this.state.currentSpeed} show={this.state.ShowAdvance} retest={this.state.retestSpeed}/>
				{showAdvancedResults}
				<Diagnostic show={this.state.ShowAdvance}/>
				<AverageTest callback={this.setDataSets} show={this.state.ShowAdvance} retest={this.state.retestSpeed} resetCallback={this.setRetest}/>
				<GoogleTest show={this.state.ShowAdvance}/>
				<PDLTest show={this.state.ShowAdvance}/>
				<IVPTest show={this.state.ShowAdvance}/>
				<Card
					containerStyle={styles.emptyCard}
				/>

				
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)