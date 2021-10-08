import createInstance from './http'

const reviewService = createInstance({ url: '/reviews' })

export async function createReview(reviewDTO) {
	const response = await reviewService.post('', reviewDTO)
	return response.data
}
