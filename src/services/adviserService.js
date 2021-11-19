import createInstance from './http'

const adviserService = createInstance({ url: '/advisers' })

export async function createClassCode({ token, adviserId }) {
	const response = await adviserService.post(`/${adviserId}/class-code`, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function getSpaceAnswers({ token, adviserId, spaceId }) {
	const response = await adviserService.get(
		`/${adviserId}/spaces/${spaceId}`,
		{
			headers: { 'X-Token': token },
		}
	)
	return response.data
}

export async function createSpace({ token, spaceDTO, adviserId }) {
	const response = await adviserService.post(
		`/${adviserId}/spaces/`,
		spaceDTO,
		{
			headers: { 'X-Token': token },
		}
	)

	return response.data
}
