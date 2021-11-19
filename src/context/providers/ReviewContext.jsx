import { createContext, useContext, useEffect, useReducer } from 'react'
import * as reviewService from '../../services/reviewService'
import { REVIEW_ACTIONS } from '../actions/reviewActions'
import { reviewInitialState, reviewReducer } from '../reducers/reviewReducer'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

export const ReviewContext = createContext({
	...reviewInitialState,
	createReview: async (reviewDTO) => reviewDTO,
	getReview: async (reviewId) => reviewId,
	updateReview: async ({ reviewId, reviewDTO }) => reviewDTO,
	publishReview: async ({ reviewId }) => false,
})

export const useReview = () => {
	const context = useContext(ReviewContext)

	return context
}

export const useReviewById = (reviewId) => {
	const { error, getReview } = useReview()

	useEffect(() => {
		getReview(reviewId)
	}, [])

	return { error }
}

export const ReviewProvider = ({ children }) => {
	const { showToast } = useToast()
	const { token } = useUserCredentials()
	const [state, dispatch] = useReducer(reviewReducer, reviewInitialState)

	const createReview = async (reviewDTO) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const review = await reviewService.createReview({
				token,
				reviewDTO,
			})
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
			const review = await reviewService.getReview({ token, reviewId })
			dispatch({ type: REVIEW_ACTIONS.LOAD_GET_SUCCESS, payload: review })
		} catch ({ response: { data } }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_CREATE_ERROR,
				payload: data,
			})
		}
	}

	const updateReview = async ({ reviewId, reviewDTO }) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const review = await reviewService.updateReview({
				token,
				reviewId,
				reviewDTO,
			})
			dispatch({
				type: REVIEW_ACTIONS.LOAD_UPDATE_SUCCESS,
				payload: review,
			})
		} catch ({ response: { data } }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_UPDATE_ERROR,
				payload: data,
			})
		}
	}

	const publishReview = async ({ reviewId }) => {
		showToast({
			color: 'info',
			message: 'Su solicitud está siendo procesada.',
		})
		try {
			await reviewService.publishReview({ reviewId, token })
			return true
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			return false
		}
	}

	return (
		<ReviewContext.Provider
			value={{
				...state,
				createReview,
				getReview,
				updateReview,
				publishReview,
			}}
		>
			{children}
		</ReviewContext.Provider>
	)
}
