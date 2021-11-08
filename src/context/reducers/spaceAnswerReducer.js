import { SPACE_ANSWER_ACTIONS } from '../actions/spaceAnswerActions'

export const spaceAnswerInitialState = {
	spaceAnswers: [],
	spaceAnswerDTO: null,
	isLoading: false,
}

export const spaceAnswerReducer = (state, { type, payload }) => {
	switch (type) {
		case SPACE_ANSWER_ACTIONS.LOAD_CREATE_SPACE_ANSWER:
			return {
				...state,
				isLoading: true,
			}
		case SPACE_ANSWER_ACTIONS.LOAD_CREATE_SPACE_ANSWER_SUCCESS:
			return {
				...state,
				spaceAnswers: [...state.spaceAnswers, payload],
			}
		case SPACE_ANSWER_ACTIONS.LOAD_SPACE_ANSWERS_LIST:
			return {
				...state,
				isLoadig: true,
			}
		case SPACE_ANSWER_ACTIONS.LOAD_SPACE_ANSWERS_LIST_SUCCESS:
			return {
				...state,
				spaceAnswers: payload,
				isLoading: false,
			}
		case SPACE_ANSWER_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
			}
	}
}
