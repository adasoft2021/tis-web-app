import { SPACE_ACTIONS } from '../actions/spaceActions'

export const spaceInitialState = {
	spaces: [],
	isLoading: false,
}

export const spaceReducer = (state, { type, payload }) => {
	switch (type) {
		case SPACE_ACTIONS.LOAD_PROYECT_SPACES_SUCCESS:
			return { ...state, spaces: payload }
		case SPACE_ACTIONS.STOP_LOADING:
			return { ...state, spaces: [] }
		default:
			return state
	}
}
