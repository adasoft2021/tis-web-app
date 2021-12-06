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

export async function createProject({ token, adviserId, projectDTO }) {
	const response = await adviserService.post(
		`/${adviserId}/projects`,
		projectDTO,
		{
			headers: {
				'X-Token': token,
			},
		}
	)
	return response.data
}

export async function getProposalsHistory({ adviserId, token }) {
	const response = await adviserService.get(
		`/${adviserId}/proposals/history`,
		{
			headers: { 'X-Token': token },
		}
	)
	return response.data
}
export async function getAnswerSpacesByProject({
	token,
	adviserId,
	projectId,
}) {
	const response = await adviserService.get(`/${adviserId}/proposals`, {
		headers: {
			'X-Token': token,
		},
		params: {
			projectId,
		},
	})
	return response.data
}

export async function getPublicationHistory({ adviserId, token, type }) {
	const response = await adviserService.get(
		`/${adviserId}/publications/history`,
		{
			headers: { 'X-Token': token },
			params: {
				type,
			},
		}
	)
	return response.data
}

export async function getActualCompanies({ token, adviserId }) {
	const response = await adviserService.get(`/${adviserId}/companies`, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function getInformationStatusReview({ adviserId, token }) {
	const response = await adviserService.get(`/${adviserId}/reviews`, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function getReportsReviews({ adviserId, token, projectId }) {
	const response = await adviserService.get(
		`/${adviserId}/reviews/published`,
		{
			headers: {
				'X-Token': token,
			},
			params: {
				projectId,
			},
		}
	)
	return response.data
}
