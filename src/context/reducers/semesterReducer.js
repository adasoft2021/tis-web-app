import { SEMESTER_ACTIONS } from '../actions/semesterActions'

export const semesterInitialState = {
	semester: null,
	semesterDTO: null,
	isLoading: false,
}

export const semesterReducer = (state, { type, payload }) => {
	switch (type) {
		case SEMESTER_ACTIONS.LOAD_SEMESTER:
			return {
				...state,
				isLoading: true,
			}
		case SEMESTER_ACTIONS.LOAD_SEMESTER_SUCCESS:
			return {
				...state,
				semester: payload,
				isLoading: false,
			}
		case SEMESTER_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		default:
			return state
	}
}
