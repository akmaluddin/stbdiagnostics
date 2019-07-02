import {NativeModules} from 'react-native';
import Ping from 'react-native-ping';
import { getDeviceInfo, getPublicIp } from '../Functions/getDeviceInfo';

export async function pingIP(ip) {
	var states = {
		speed: null
	}
	console.log(ip)

	try {
		for (i=0; i<10; i++){
			var speed = 0;

			await Ping.start(ip,{ timeout: 1000 })
				.then(response=>{
					console.log(response)
					states={...states, speed: speed+(response/10)+states.speed}
				})
		}

		states={...states, speed: states.speed.toFixed(2)}
		return(states)

	} catch(error) {
		console.log(error)
		states = {...states, speed: "Timeout"}
		return(states)
	}
}

export async function pingTen(domainname){
	var states={
		ip: null,
		speed: null
	}
	try{
		for (i=0; i<10; i++){
			var speed = 0;
			await NativeModules.ResolveDNS.test(domainname)
				.then(response=>{
					speed = response[0]/10
					states={...states, ip: response[1]}
				})

			await Ping.start(states.ip,{ timeout: 1000 })
				.then(response=>{
					states={...states, speed: speed+(response/10)+states.speed}
				})
		}

		states={...states, speed: states.speed.toFixed(2)}
		return(states)

	} catch(error) {
		states = {...states, speed: "Timeout"}
		return(states)
	}
}

export async function pingTest(){
	try {
		var states = {
			googleIp: null,
			csdsIp: null,
			googlePing: null,
			csdsPing: null,
			pdlIp: null,
			pdlPing: null,
		}
		await pingTen('www.google.com')
			.then(response=>{
				states={
					...states,
					googleIp: response.ip,
					googlePing: response.speed
				}
			})

		await pingTen('csds-astro.astro.com.my')
			.then(response=>{
				states={
					...states,
					csdsIp: response.ip,
					csdsPing: response.speed
				}
			})

		await pingTen('pdl.astro.com.my')
			.then(response=>{
				states={
					...states,
					pdlIp: response.ip,
					pdlPing: response.speed
				}
			})

		return(states)
		
	} catch(error) {
		return Promise.reject(error)
	}
}

export async function deviceInfo(){
	var state={
		deviceConnectionType: null,
		publicIp: null,
	}

	try {
		await getDeviceInfo()
			.then(response=>{
				state={
					...state,
					deviceConnectionType: response.type,
				}
			})
			.catch(error=>{
				console.log(error)
			})

		await getPublicIp()
			.then(response=>{
				state={
					...state,
					publicIp: response
				}
			})
			.catch(error=>{
				console.log(error)
			})

		console.log(state)
		return(state)
	} catch (error) {
		console.log("ERROR")
	}
}