import { DISCUSSION_ACTIONS } from '../actions/discussionActions'

export const discussionInitialState = {
	discussions: [],
	isLoading: false,
}

export const discussionReducer = (state, { type, payload }) => {
	switch (type) {
		case DISCUSSION_ACTIONS.LOAD_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case DISCUSSION_ACTIONS.LOAD_CREATE_DISCUSSION_SUCCESS:
			return {
				...state,
				discussions: [payload, ...state.discussions],
				isLoading: false,
			}
		case DISCUSSION_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		default:
			return state
	}
}
