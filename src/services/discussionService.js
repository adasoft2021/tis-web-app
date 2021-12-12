import createInstance from './http'
const discussionService = createInstance({ url: '/discussions' })

export async function createDiscussion({ token, discussionDTO }) {
	const response = await discussionService.post('', discussionDTO, {
		headers: { 'X-Token': token },
	})
	return response
}
