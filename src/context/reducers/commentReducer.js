import { COMMENT_ACTIONS } from '../actions/commentActions'

export const commentInitialState = {
	comments: [],
	isLoading: false,
}

export const commentReducer = (state, { type, payload }) => {
	switch (type) {
		case COMMENT_ACTIONS.LOAD_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case COMMENT_ACTIONS.LOAD_CREATE_COMMENT_SUCCESS:
			return {
				...state,
				comments: [payload, ...state.comments],
				isLoading: false,
			}
		case COMMENT_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		default:
			return state
	}
}
