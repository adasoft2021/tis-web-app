import createInstance from './http'

const proposalService = createInstance({ url: '/proposals' })

export async function getAllAdviserProposals(adviserId) {
	const response = await proposalService.get('', {
		headers: {},
		params: {
			adviser: adviserId,
		},
	})

	return response.data
}

export async function getProposal(proposalId) {
	const response = await proposalService.get(`/${proposalId}`)
	return response.data
}
