import { createContext, useContext, useEffect, useReducer } from 'react'
import * as reviewService from '../../services/reviewService'
import { REVIEW_ACTIONS } from '../actions/reviewActions'
import { reviewInitialState, reviewReducer } from '../reducers/reviewReducer'

export const ReviewContext = createContext({
	...reviewInitialState,
	createReview: async (reviewDTO) => {},
	getReview: async ({ reviewId }) => {},
	updateReview: async ({ reviewId, reviewDTO }) => {},
})

export const useReview = () => {
	const context = useContext(ReviewContext)

	return context
}

export const useReviewById = (reviewId) => {
	const { error, getReview } = useReview()

	useEffect(() => {
		getReview({ reviewId })
	}, [])

	return { error }
}

export const ReviewProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reviewReducer, reviewInitialState)

	const createReview = async (reviewDTO) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const review = await reviewService.createReview(reviewDTO)
			dispatch({
				type: REVIEW_ACTIONS.LOAD_CREATE_SUCCESS,
				payload: review,
			})
		} catch ({ response: { data, status }, ...rest }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_CREATE_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const getReview = async ({ reviewId }) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const review = await reviewService.getReview({ reviewId })
			dispatch({ type: REVIEW_ACTIONS.LOAD_GET_SUCCESS, payload: review })
		} catch ({ response: { data, status }, ...rest }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_GET_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const updateReview = async ({ reviewId, reviewDTO }) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const review = await reviewService.updateReview({
				reviewId,
				reviewDTO,
			})
			dispatch({
				type: REVIEW_ACTIONS.LOAD_UPDATE_SUCCESS,
				payload: review,
			})
		} catch ({ response: { data, status }, ...rest }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_UPDATE_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	return (
		<ReviewContext.Provider
			value={{ ...state, createReview, getReview, updateReview }}
		>
			{children}
		</ReviewContext.Provider>
	)
}
