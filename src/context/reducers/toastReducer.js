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
				show: true,
			}
		case TOAST_ACTIONS.RESET:
			return { ...toastInitialState }
		default:
			return state
	}
}
