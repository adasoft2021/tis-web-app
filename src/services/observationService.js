import createInstance from './http'

const observationService = createInstance({ url: '/observations' })

export async function createObservation({ token, proposalId, observationDTO }) {
	const response = await observationService.post('', observationDTO, {
		headers: {
			'X-Token': token,
		},
		params: {
			proposal: proposalId,
		},
	})
	return response.data
}

export async function deleteObservation({ token, observationId }) {
	await observationService.delete(`/${observationId}`, {
		headers: {
			'X-Token': token,
		},
	})
}

export async function getObservation({ token, observationId }) {
	const response = await observationService.get(`/${observationId}`, {
		headers: {
			'X-Token': token,
		},
	})
	return response.data
}

export async function getAllProposalObservations({ token, proposalId }) {
	const response = await observationService.get('', {
		headers: {
			'X-Token': token,
		},
		params: {
			proposal: proposalId,
		},
	})

	return response.data
}

export async function updateObservation({
	token,
	observationId,
	observationDTO,
}) {
	const response = await observationService.put(
		`/${observationId}`,
		observationDTO,
		{
			headers: {
				'X-Token': token,
			},
		}
	)

	return response.data
}
