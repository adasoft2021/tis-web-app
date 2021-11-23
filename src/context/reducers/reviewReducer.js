import { REVIEW_ACTIONS } from '../actions/reviewActions'

export const reviewInitialState = {
	review: null,
	reviews: [],
	error: null,
	isLoading: true,
	qualifications: {
		qualificationIntialState: null,
		qualificationSchema: null,
	},
}

const getReview = ({ qualifications, ...rest }) => {
	qualifications = qualifications.sort(
		({ description: d1 }, { description: d2 }) => d2.length - d1.length
	)

	return {
		...rest,
		qualifications,
	}
}

export const reviewReducer = (state, { type, payload }) => {
	switch (type) {
		case REVIEW_ACTIONS.LOAD_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case REVIEW_ACTIONS.LOAD_CREATE_SUCCESS:
		case REVIEW_ACTIONS.LOAD_GET_SUCCESS:
		case REVIEW_ACTIONS.LOAD_UPDATE_SUCCESS:
			return {
				...state,
				review: getReview(payload),
				error: null,
				isLoading: false,
			}
		case REVIEW_ACTIONS.LOAD_ADVISER_REVIEWS_SUCCESS:
			return {
				...state,
				reviews: payload,
				error: null,
				isLoading: false,
			}
		case REVIEW_ACTIONS.LOAD_CREATE_ERROR:
		case REVIEW_ACTIONS.LOAD_GET_ERROR:
		case REVIEW_ACTIONS.LOAD_UPDATE_ERROR:
		case REVIEW_ACTIONS.LOAD_ADVISER_REVIEWS_ERROR:
			return {
				...state,
				review: null,
				reviews: [],
				error: payload,
				isLoading: false,
			}

		case REVIEW_ACTIONS.LOAD_GET_COMPANY_REVIEWS:
			return {
				...state,
				isLoading: true,
			}

		case REVIEW_ACTIONS.LOAD_GET_COMPANY_REVIEWS_SUCCESS:
			return {
				...state,
				isLoading: false,
				reviews: payload,
			}
		case REVIEW_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		case REVIEW_ACTIONS.SET_QUALIFICATIONS:
			return {
				...state,
				qualifications: payload,
			}
		default:
			return state
	}
}
