import createInstance from './http'

const observationService = createInstance({ url: '/observations' })

export async function createObservation({ proposalId, observationDTO }) {
	const response = await observationService.post('', observationDTO, {
		params: {
			proposal: proposalId,
		},
	})
	return response.data
}

export async function deleteObservation({ observationId }) {
	await observationService.delete('/{observationId}', {
		params: {
			id: observationId,
		},
	})
}

export async function getObservation(observationId) {
	const response = await observationService.get(`/${observationId}`)
	return response.data
}

export async function getAllProposalObservations({ proposalId }) {
	const response = await observationService.get('', {
		params: {
			proposal: proposalId,
		},
	})

	return response.data
}

export async function updateObservation({ observationId, observationDTO }) {
	const response = await observationService.put(
		'/{observationId}',
		observationDTO,
		{
			params: {
				id: observationId,
			},
		}
	)

	return response.data
}
