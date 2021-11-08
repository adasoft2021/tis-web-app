import createInstance from './http'

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
