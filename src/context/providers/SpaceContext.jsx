import { createContext, useContext, useReducer } from 'react'
import { SPACE_ACTIONS } from '../actions/spaceActions'
import { spaceInitialState, spaceReducer } from '../reducers/spaceReducer'

const SpaceContext = createContext({
	...spaceInitialState,
	getProjectSpaces: ({ projectId }) => {},
})

export const useSpace = () => {
	const context = useContext(SpaceContext)
	return context
}

export const SpaceProvider = ({ children }) => {
	const [state, dispatch] = useReducer(spaceReducer, spaceInitialState)
	const getProjectSpaces = async ({ projectId }) => {
		if (projectId) {
			dispatch({
				type: SPACE_ACTIONS.LOAD_PROJECT_SPACES_SUCCESS,
				payload: [
					{ id: '1', title: 'Parte A' },
					{ id: '2', title: 'Parte B' },
					{ id: '3', title: 'Orden de cambio' },
				],
			})
		} else {
			dispatch({ type: SPACE_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<SpaceContext.Provider value={{ ...state, getProjectSpaces }}>
			{children}
		</SpaceContext.Provider>
	)
}
