import { SPACE_ACTIONS } from '../actions/spaceActions'

export const spaceInitialState = {
	spaceDTO: null,
	spaces: [],
	isLoading: false,
}

export const spaceReducer = (state, { type, payload }) => {
	switch (type) {
		case SPACE_ACTIONS.LOAD_SPACE:
			return {
				...state,
				isLoading: true,
			}
		case SPACE_ACTIONS.LOAD_SPACE_SUCCESS:
			return {
				...state,
				isLoading: false,
				spaceDTO: payload,
			}
		case SPACE_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: false,
				spaces: [],
			}
		case SPACE_ACTIONS.LOAD_PROJECT_SPACES_SUCCESS:
			return { ...state, spaces: payload }
		case SPACE_ACTIONS.LOAD_COMPANY_SPACES:
			return {
				...state,
				isLoading: true,
			}
		case SPACE_ACTIONS.LOAD_COMPANY_SPACES_SUCCESS:
			return {
				...state,
				spaces: payload,
				isLoading: false,
			}
		default:
			return state
	}
}
