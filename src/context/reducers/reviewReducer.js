import { REVIEW_ACTIONS } from '../actions/reviewActions'

export const reviewInitialState = {
	review: null,
	error: null,
	isLoading: false,
}

export const reviewReducer = (state, { type, payload }) => {
	switch (type) {
		case REVIEW_ACTIONS.LOAD_CREATE:
			return {
				...state,
				isLoading: true,
			}
		case REVIEW_ACTIONS.LOAD_CREATE_SUCCESS:
			return {
				...state,
				review: payload,
				error: null,
				isLoading: false,
			}
		case REVIEW_ACTIONS.LOAD_CRETE_ERROR:
			return {
				...state,
				error: payload,
				review: null,
				isLoading: false,
			}
		case REVIEW_ACTIONS.RESET:
			return reviewInitialState
		default:
			return state
	}
}
