import createInstance from './http'

const reviewService = createInstance({ url: '/reviews' })

export const createReview = async (reviewDTO) => {
	const response = await reviewService.post('', reviewDTO)
	return response.data
}
