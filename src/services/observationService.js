import createInstance from './http'

const observationService = createInstance({ url: '/observations' })

export async function createObservation(observationDTO) {
	const response = await observationService.post('', observationDTO)
	return response.data
}

export async function getObservation(observationId) {
	const response = await observationService.get(`/${observationId}`)
	return response.data
}

export async function getAllProposalObservations({ proposalId = 1 }) {
	const response = await observationService.get('', {
		headers: {},
		params: {
			proposal: proposalId,
		},
	})

	return response.data
}
