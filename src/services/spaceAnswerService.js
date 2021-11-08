import createInstance from './http'
import { getSpaceAnswers } from './adviserService'

const spaceService = createInstance({ url: '/spaces' })

export async function createSpaceAnswer({ token, spaceId, spaceAnswerDTO }) {
	const response = await spaceService.post(`/${spaceId}`, spaceAnswerDTO, {
		headers: { 'X-Token': token },
	})

	return response.data
}

export { getSpaceAnswers }
