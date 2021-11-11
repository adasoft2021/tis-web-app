import createInstance from './http'

const publicationService = createInstance({ url: '/publications' })

export async function createPublication({ token, publicationDTO }) {
	const response = await publicationService.post('', publicationDTO, {
		headers: { 'X-Token': token },
	})

	return response.data
}

export async function updatePublication({
	token,
	publicationId,
	publicationDTO,
}) {
	const response = await publicationService.put(
		`/${publicationId}`,
		publicationDTO,
		{
			headers: { 'X-Token': token },
		}
	)

	return response.data
}

export async function getAllAdviserPublications({
	token,
	adviserId,
	publicationType,
}) {
	const response = await publicationService.get('', {
		headers: { 'X-Token': token },
		params: {
			adviserId,
			type: publicationType,
		},
	})

	return response.data
}

export async function deletePublication({ token, publicationId }) {
	await publicationService.delete(`/${publicationId}`, {
		headers: { 'X-Token': token },
	})
}

export async function getPublishedPublications({ publicationType }) {
	const response = await publicationService.get('/published', {
		params: { adviserId: 1, type: publicationType, semester: '2-2021' },
	})
	return response.data
}
