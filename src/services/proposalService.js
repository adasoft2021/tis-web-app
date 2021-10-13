import createInstance from './http'

const proposalService = createInstance({ url: '/proposals' })

export async function getAllAdviserProposals({
	adviserId = 1,
	adviserToken = 'eyJhbCI6IkhTMjU2IiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImxldGljaWEiLCJpYXQiOjE1MTYyMzkwMjJ9.erG1UFNeP9IjSl7ZuZRwDjo32yLsSYQUbULJ8LGq2cQ',
}) {
	const response = await proposalService.get('', {
		headers: {
			Authorization: adviserToken,
		},
		params: {
			adviser: adviserId,
		},
	})

	return response.data
}
