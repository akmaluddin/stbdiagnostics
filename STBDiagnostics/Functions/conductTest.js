import {NativeModules} from 'react-native';

const types={
	cache: 'no-store'
}

function calculateBandwidth(time, size) {
	return (size/1000000*8/(time/1000))
}

export function debounce(ms) {
	return function(x) {
		return new Promise(resolve => setTimeout(() => resolve(x), ms));
	};
}

export async function pingdns(domainname){
	await NativeModules.ResolveDNS.test(domainname)
		.then(response=>{
			return(response)
		})
		.catch(error=>{
			return Promise.reject(error)
		})
}

export async function testIVPResponse() {
	try {
		var measurement = new Date()
		var size
		await fetch('https://csds-astro.astro.com.my', types)
			.then(response=>{
				size = response._bodyInit._data.size
				measurement = new Date() - measurement
			})
		var speed = calculateBandwidth(measurement, size)
		return ({
			ivpResponseTime: measurement,
			ivpTestSpeed: speed.toFixed(2)
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export async function testPublicInternet() {
	try {
		var measurement = new Date()
		var size
		await fetch('https://www.google.com', types)
			.then(debounce(5000)).then(response=>{
				size = response._bodyInit._data.size
				measurement = new Date() - measurement
			})
			.catch(error=>{
				return Promise.reject(error)
			})
		var speed = calculateBandwidth(measurement, size)
		return ({
			publicInternetTime: measurement,
			publicInternetSpeed: speed.toFixed(2),
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export async function testAstroPDL() {
	try {
		var measurement = new Date()
		var size
		await fetch('http://pdl.astro.com.my', types)
			.then(response=>{
				size = response._bodyInit._data.size
				measurement = new Date() - measurement
			})
		var speed = calculateBandwidth(measurement, size)
		return ({
			pdlTime: measurement,
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export async function pdlSpeedTest() {
	try {
		var measurement = new Date()
		var size
		await fetch('http://pdl.astro.com.my/astro/PREVIEW/astro-PREV1407070011111111-201611110114120000.nff?cardid=1', types)
			.then(debounce(1000)).then(response=>{
				size = response._bodyInit._data.size
				measurement = new Date() - measurement - 1000
			})
		var speed = calculateBandwidth(measurement, size)
		return ({
			SpeedTestTime: measurement,
			SpeedTestSpeed: speed.toFixed(2),
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

