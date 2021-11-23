import { createContext, useContext, useEffect, useReducer } from 'react'
import * as reviewService from '../../services/reviewService'
import { REVIEW_ACTIONS } from '../actions/reviewActions'
import { reviewInitialState, reviewReducer } from '../reducers/reviewReducer'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

export const ReviewContext = createContext({
	...reviewInitialState,
	createReview: async ({ reviewDTO }) => reviewDTO,
	getReview: async ({ reviewId }) => reviewId,
	updateReview: async ({ reviewId, reviewDTO }) => reviewDTO,
	getAdviserReviews: async () => {},
	getCompanyReviews: async () => {},
})

export const useReview = () => {
	const context = useContext(ReviewContext)

	return context
}

export const useReviewById = (reviewId) => {
	const { error, review, getReview } = useReview()

	useEffect(() => {
		getReview({ reviewId })
	}, [])

	return { error, review }
}

export const useCompanyReviews = () => {
	const { getCompanyReviews, isLoading, reviews } = useReview()
	useEffect(() => {
		getCompanyReviews()
	}, [])
	return { isLoading, reviews }
}

export const useCompanyReviewById = ({ reviewId }) => {
	const { getReview, isLoading, review } = useReview()
	useEffect(() => {
		getReview({ reviewId })
	}, [])

	return { isLoading, review }
}
export const ReviewProvider = ({ children }) => {
	const { showToast } = useToast()
	const { token, id } = useUserCredentials()
	const [state, dispatch] = useReducer(reviewReducer, reviewInitialState)

	const createReview = async ({ reviewDTO }) => {
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

	const getReview = async ({ reviewId }) => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const review = await reviewService.getReview({ token, reviewId })
			dispatch({ type: REVIEW_ACTIONS.LOAD_GET_SUCCESS, payload: review })
		} catch ({ response: { data } }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_GET_ERROR,
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

	const getAdviserReviews = async () => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_REQUEST })
		try {
			const reviews = await reviewService.getAdviserReviews({ token })
			dispatch({
				type: REVIEW_ACTIONS.LOAD_ADVISER_REVIEWS_SUCCESS,
				payload: reviews,
			})
		} catch ({ response: { data } }) {
			dispatch({
				type: REVIEW_ACTIONS.LOAD_ADVISER_REVIEWS_ERROR,
				payload: data,
			})
		}
	}
	const getCompanyReviews = async () => {
		dispatch({ type: REVIEW_ACTIONS.LOAD_GET_COMPANY_REVIEWS })
		try {
			const reviews = await reviewService.getCompanyReviews({
				token,
				companyId: id,
			})
			dispatch({
				type: REVIEW_ACTIONS.LOAD_GET_COMPANY_REVIEWS_SUCCESS,
				payload: reviews,
			})
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
			dispatch({ type: REVIEW_ACTIONS.STOP_LOADING })
		}
	}

	return (
		<ReviewContext.Provider
			value={{
				...state,
				createReview,
				getReview,
				updateReview,
				getAdviserReviews,
				getCompanyReviews,
			}}
		>
			{children}
		</ReviewContext.Provider>
	)
}
