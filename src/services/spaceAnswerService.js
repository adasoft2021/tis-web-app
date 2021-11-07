import createInstance from './http'
import { getSpaceAnswers } from './adviserService'

const spaceService = createInstance({ url: '/spaces' })

export async function createSpaceAnswer({ spaceId, spaceAnswerDTO }) {
	const response = await spaceService.post(`/${spaceId}`, spaceAnswerDTO)

	return response.data
}

export { getSpaceAnswers }
