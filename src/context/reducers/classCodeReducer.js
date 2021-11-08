import { CLASSCODE_ACTIONS } from '../actions/classCodeActions'

export const classCodeInitialState = {
	classCode: null,
	isLoading: false,
}

export const classCodeReducer = (state, { type, payload }) => {
	switch (type) {
		case CLASSCODE_ACTIONS.LOAD_CREATE_CLASSCODE:
			return { ...state, isLoading: true }
		case CLASSCODE_ACTIONS.LOAD_CREATE_CLASSCODE_SUCESS:
			return { ...state, classCode: payload, isLoading: false }
		case CLASSCODE_ACTIONS.LOAD_VALIDATE_CLASSCODE:
			return { ...state, isLoading: true }
		case CLASSCODE_ACTIONS.LOAD_VALIDATE_CLASSCODE_SUCCES:
			return { ...state, isLoading: false }
		case CLASSCODE_ACTIONS.STOP_LOADING:
			return { ...state, classCode: null, isLoading: false }
		default:
			return state
	}
}
