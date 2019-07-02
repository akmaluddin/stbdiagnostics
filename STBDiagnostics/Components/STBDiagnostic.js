import React, { Component, Fragment } from 'react';
import {Platform, StyleSheet, Text, View, Image, NativeModules} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
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
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-evenly',
						marginLeft: 20,
						marginRight: 20,
						flex: 1,
					}}>
						<Button
							onPress={()=>{this.showMoreInfo()}}
							buttonStyle={styles.button}
							titleStyle={styles.buttonText}
							title="Hide Info"
						/>
						<Button
							onPress={()=>{this.reloadTest()}}
							buttonStyle={styles.button}
							titleStyle={styles.buttonText}
							title="Reload"
						/>
					</View>
					

				</Fragment>
			) : (
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					marginLeft: 20,
					marginRight: 20,
					flex: 1,
				}}>
					<Button
						onPress={()=>{this.showMoreInfo()}}
						buttonStyle={styles.button}
						titleStyle={styles.buttonText}
						title="More Info"
					/>
					<Button
						onPress={()=>{this.reloadTest()}}
						buttonStyle={styles.button}
						titleStyle={styles.buttonText}
						title="Reload"
					/>
				</View>
			)

		return(
			<Fragment>
				<AverageSummary data={this.state.datasets} currentSpeed={this.state.currentSpeed} show={this.state.ShowAdvance} retest={this.state.retestSpeed}/>
				{showAdvancedResults}
				<Diagnostic show={this.state.ShowAdvance} retest={this.state.retestDiagnostic} resetCallback={this.setRetest}/>
				<GoogleTest show={this.state.ShowAdvance}/>
				<PDLTest show={this.state.ShowAdvance}/>
				<IVPTest show={this.state.ShowAdvance}/>
				<AverageTest callback={this.setDataSets} show={this.state.ShowAdvance} retest={this.state.retestSpeed} resetCallback={this.setRetest}/>
				<Card
					containerStyle={styles.emptyCard}
				/>

				
			</Fragment>
		)
	}
}

const styles = StyleSheet.create(universalstyles)