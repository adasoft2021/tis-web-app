import { createContext, useContext, useReducer } from 'react'
import { TOAST_ACTIONS } from '../actions/toastActions'

import { toastInitialState, toastReducer } from '../reducers/toastReducer'

const ToasContext = createContext({
	toastInitialState,
	changeToast: ({ color, message }) => {},
	closeToast: () => {},
	showToast: () => {},
	resetToast: () => {},
})

export const useToast = () => {
	const context = useContext(ToasContext)

	return context
}

export const ToastProvider = ({ children }) => {
	const [state, dispatch] = useReducer(toastReducer, toastInitialState)

	const changeToast = ({ color, message }) => {
		dispatch({
			type: TOAST_ACTIONS.CHANGE_COLOR_MESSAGE,
			payload: { color, message },
		})
	}
	const closeToast = () => {
		dispatch({ type: TOAST_ACTIONS.CHANGE_SHOW, payload: false })
	}
	const showToast = () => {
		dispatch({ type: TOAST_ACTIONS.CHANGE_SHOW, payload: true })
	}
	const resetToast = () => {
		dispatch({ type: TOAST_ACTIONS.RESET })
	}

	return (
		<ToasContext.Provider
			value={{ ...state, changeToast, closeToast, showToast, resetToast }}
		>
			{children}
		</ToasContext.Provider>
	)
}
