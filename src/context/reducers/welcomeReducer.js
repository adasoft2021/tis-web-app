import { WELCOME_ACTIONS } from '../actions/welcomeActions'

export const welcomeInitialState = {
	message: null,
	errorMessage: null,
	isLoading: false,
}

export const welcomeReducer = (state, { type, payload }) => {
	switch (type) {
		case WELCOME_ACTIONS.LOAD_MESSAGE:
			return {
				...state,
				isLoading: true,
			}
		case WELCOME_ACTIONS.LOAD_MESSAGE_SUCCESS:
			return {
				...state,
				message: payload,
				errorMessage: null,
				isLoading: false,
			}
		case WELCOME_ACTIONS.LOAD_MESSAGE_ERROR:
			return {
				...state,
				errorMessage: payload,
				message: null,
				isLoading: false,
			}
		default:
			return state
	}
}
