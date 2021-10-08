import { createContext, useContext, useReducer } from 'react'
import * as reviewService from '../../services/reviewService'
import { REVIEW_ACTIONS } from '../actions/reviewActions'
import { reviewInitialState, reviewReducer } from '../reducers/reviewReducer'

export const ReviewContext = createContext({
	...reviewInitialState,
	createReview: async (reviewDTO) => reviewDTO,
	getReview: async (reviewId) => reviewId,
})

export const useReview = () => {
	const context = useContext(ReviewContext)

	return context
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
		} catch ({ response: { data } }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_CREATE_ERROR,
				payload: data,
			})
		}
	}

	const getReview = async (reviewId) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const review = await reviewService.getReview(reviewId)
			dispatch({ type: REVIEW_ACTIONS.LOAD_GET_SUCCESS, payload: review })
		} catch ({ response: { data } }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_CREATE_ERROR,
				payload: data,
			})
		}
	}

	return (
		<ReviewContext.Provider value={{ ...state, createReview, getReview }}>
			{children}
		</ReviewContext.Provider>
	)
}
