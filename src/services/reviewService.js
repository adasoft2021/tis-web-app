import createInstance from './http'

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

export async function getAdviserReviews({ token }) {
	const response = await reviewService.get('', {
		headers: { 'X-Token': token },
	})
	return response.data
}
