import { TOAST_ACTIONS } from '../actions/toastActions'

export const toastInitialState = {
	message: null,
	color: null,
	show: false,
}

export const toastReducer = (state, { type, payload }) => {
	switch (type) {
		case TOAST_ACTIONS.CHANGE_COLOR_MESSAGE:
			return {
				...state,
				color: payload.color,
				message: payload.message,
			}
		case TOAST_ACTIONS.CHANGE_SHOW:
			return {
				...state,
				show: payload,
			}
		case TOAST_ACTIONS.RESET:
			return toastInitialState
		default:
			return state
	}
}
