import { SPACE_ACTIONS } from '../actions/spaceActions'

export const spaceInitialState = {
	spaceDTO: null,
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
			}
		default:
			return state
	}
}
