import { PROJECT_ACTIONS } from '../actions/projectActions'

export const projectInitialState = {
	projects: [],
	isLoading: false,
}

export const projectReducer = (state, { type, payload }) => {
	switch (type) {
		case PROJECT_ACTIONS.LOAD_CREATE_PROJECT:
			return {
				...state,
				isLoading: true,
			}
		case PROJECT_ACTIONS.LOAD_CREATE_PROJECT_SUCCESS:
			return {
				...state,
				projects: [...state.projects, payload],
				isLoading: false,
			}
		case PROJECT_ACTIONS.STOP_LOADING:
			return {
				...state,
				isLoading: true,
			}
	}
}
