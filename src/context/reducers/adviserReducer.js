import { ADVISER_ACTIONS } from '../actions/adviserActions'

export const adviserInitialState = {
	spaceAnswers: [],
	isLoadig: false,
}

export const adviserReducer = (state, { type, payload }) => {
	switch (type) {
		case ADVISER_ACTIONS.LOAD_SPACE_ANSWERS_LIST:
			return {
				...state,
				isLoadig: true,
			}
		case ADVISER_ACTIONS.LOAD_SPACE_ANSWERS_LIST_SUCCESS:
			return {
				...state,
				spaceAnswers: payload,
				isLoading: false,
			}
		case ADVISER_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
		default:
			return state
	}
}
