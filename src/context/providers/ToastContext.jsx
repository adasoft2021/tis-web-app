import { createContext, useContext, useReducer } from 'react'
import { TOAST_ACTIONS } from '../actions/toastActions'

import { toastInitialState, toastReducer } from '../reducers/toastReducer'

const ToastContext = createContext({
	...toastInitialState,
	closeToast: () => {},
	showToast: ({ color, message }) => {},
})

export const useToast = () => {
	const context = useContext(ToastContext)

	return context
}

export const ToastProvider = ({ children }) => {
	const [state, dispatch] = useReducer(toastReducer, toastInitialState)

	const closeToast = () => {
		dispatch({ type: TOAST_ACTIONS.RESET })
	}
	const showToast = ({ color, message }) => {
		dispatch({
			type: TOAST_ACTIONS.CHANGE_COLOR_MESSAGE,
			payload: { color, message },
		})
	}

	return (
		<ToastContext.Provider value={{ ...state, closeToast, showToast }}>
			{children}
		</ToastContext.Provider>
	)
}
