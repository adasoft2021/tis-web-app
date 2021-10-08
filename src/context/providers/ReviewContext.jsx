import { createContext, useContext, useReducer } from 'react'
import * as reviewService from '../../services/reviewService'
import { REVIEW_ACTIONS } from '../actions/reviewActions'
import { reviewInitialState, reviewReducer } from '../reducers/reviewReducer'

export const ReviewContext = createContext({
	...reviewInitialState,
	createReview: async (reviewDTO) => reviewDTO,
})

export const useReview = () => {
	const context = useContext(ReviewContext)

	return context
}

export const ReviewProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reviewReducer, reviewInitialState)

	const createReview = async (reviewDTO) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_CREATE })
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

	return (
		<ReviewContext.Provider value={{ ...state, createReview }}>
			{children}
		</ReviewContext.Provider>
	)
}
