import { USER_CREDENTIALS_ACTIONS } from '../actions/userCredentialsActions'

export const userTypes = {
	ADVISER: 'ADVISER',
	COMPANY: 'COMPANY',
}

export const userCredentialsInitialState = {
	id: null,
	token: null,
	userType: null,
}

export const userCredentialsReducer = (state, { type, payload }) => {
	switch (type) {
		case USER_CREDENTIALS_ACTIONS.SET_USER_CREDENTIALS:
			return {
				...state,
				...payload,
			}
		case USER_CREDENTIALS_ACTIONS.DELETE_USER_CREDENTIALS:
			return userCredentialsInitialState
		default:
			return state
	}
}
