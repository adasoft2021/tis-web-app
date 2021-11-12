import { PROYECT_ACTIONS } from '../actions/proyectActions'

export const proyectInitialState = {
	proyects: [],
}

export const proyectReducer = (state, { type, payload }) => {
	switch (type) {
		case PROYECT_ACTIONS.LOAD_ADVISER_PROYECTS_SUCCESS:
			return { ...state, proyects: payload }
		default:
			return state
	}
}
