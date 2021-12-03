import createInstance from './http'
import { getAnswerSpacesByProject } from './adviserService'

const proposalService = createInstance({ url: '/proposals' })

export async function getAllAdviserProposals({ token, adviserId }) {
	const response = await proposalService.get('', {
		headers: {
			'X-Token': token,
		},
		params: {
			adviser: adviserId,
		},
	})

	return response.data
}

export async function getProposal({ token, proposalId }) {
	const response = await proposalService.get(`/${proposalId}`, {
		headers: {
			'X-Token': token,
		},
	})
	return response.data
}

export { getAnswerSpacesByProject }
