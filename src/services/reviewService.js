import createInstance from './http'

const reviewService = createInstance({ url: '/reviews' })

export async function createReview(reviewDTO) {
	const response = await reviewService.post('', reviewDTO)
	return response.data
}

export async function getReview(reviewId) {
	const response = await reviewService.get(`/${reviewId}`)
	return response.data
}
