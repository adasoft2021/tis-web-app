import createInstance from './http'

const observationSevice = createInstance({ url: '/observations' })

export async function createObservation(observationDTO) {
	const response = await observationSevice.post('', observationDTO)
	return response.data
}
