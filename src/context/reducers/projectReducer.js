import { PROJECT_ACTIONS } from '../actions/projectActions'

export const projectInitialState = {
	projectDTO: null,
	projects: [],
}

export const projectReducer = (state, { type, payload }) => {
	switch (type) {
		case PROJECT_ACTIONS.ADD_CREATED_PROJECT:
			return {
				...state,
				projects: [...state.projects, payload],
			}
	}
}
