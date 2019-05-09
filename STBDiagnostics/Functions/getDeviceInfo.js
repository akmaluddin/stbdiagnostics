import NetInfo from "@react-native-community/netinfo";

export async function getDeviceInfo() {
	try{
		let info = NetInfo.getConnectionInfo()
		return info
	} catch (error) {
		return error
	}
}

export async function getPublicIp() {
	try{
		let response = await fetch('https://api.ipify.org/?format=json')
		let responseData = await response.json()
		return(responseData.ip)
	} catch (error) {
		return (error)
	}
}

export async function getDNSResolver() {
	try{
		let response = await fetch('http://whatsmyresolver.stdlib.net/resolver/')
		let responseData = await response.text()
		let DNS = responseData.split("resolver=")[1].split("\"")[1]
		return DNS
	} catch(error) {
		return Promise.reject(error)
	}
}

