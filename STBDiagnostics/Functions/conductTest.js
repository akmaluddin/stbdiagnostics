

export async function testIVP() {
	try{
		let response = await fetch('https://csds-astro.astro.com.my')
		console.log(response.url)
		return (response)
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
}

export async function testIVPResponse() {
	try {
		var measurement = new Date()
		var size
		await fetch('https://csds-astro.astro.com.my')
			.then(response=>{
				size = response._bodyInit._data.size
				measurement = new Date() - measurement
			})
		var speed = size/1000000*8/(measurement/1000);
		console.log(speed)
		return ({
			ivpResponseTime: measurement,
			ivpTestSpeed: speed.toFixed(2)
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

