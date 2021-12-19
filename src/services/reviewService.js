import createInstance from './http'
import { getCompanyReviews } from './companyService'
import { getInformationStatusReview, getReportsReviews } from './adviserService'
const reviewService = createInstance({ url: '/reviews' })

export async function createReview({ token, reviewDTO }) {
	const response = await reviewService.post('', reviewDTO, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function getReview({ token, reviewId }) {
	const response = await reviewService.get(`/${reviewId}`, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function updateReview({ token, reviewId, reviewDTO }) {
	const response = await reviewService.put(`/${reviewId}`, reviewDTO, {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function publishReview({ reviewId, token }) {
	const response = await reviewService.put(
		`/${reviewId}/publish`,
		undefined,
		{ headers: { 'X-Token': token } }
	)
	return response.data
}

export async function getAdviserReviews({ token }) {
	const response = await reviewService.get('', {
		headers: { 'X-Token': token },
	})
	return response.data
}

export async function updateReviewStatus({ reviewId, token, newStatus }) {
	const response = await reviewService.put(`/${reviewId}`, undefined, {
		headers: {
			'X-Token': token,
		},
		params: {
			newStatus,
		},
	})
	return response.data
}
export async function getPossibleFinalStateReview({ reviewId, token }) {
	const response = await reviewService.get(`/${reviewId}/publish`, {
		headers: {
			'X-Token': token,
		},
	})
	return response.data
}

export { getCompanyReviews, getInformationStatusReview, getReportsReviews }
