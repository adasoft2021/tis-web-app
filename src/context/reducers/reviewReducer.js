import { REVIEW_ACTIONS } from '../actions/reviewActions'

export const reviewInitialState = {
	review: null,
	error: null,
	isLoading: false,
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
				review: payload,
				error: null,
				isLoading: false,
			}
		case REVIEW_ACTIONS.LOAD_CREATE_ERROR:
		case REVIEW_ACTIONS.LOAD_GET_ERROR:
		case REVIEW_ACTIONS.LOAD_UPDATE_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			}
		default:
			return state
	}
}
