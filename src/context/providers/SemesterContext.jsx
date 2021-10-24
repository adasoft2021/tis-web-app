import { createContext, useContext, useEffect, useReducer } from 'react'
import * as semesterService from '../../services/semesterService'
import {
	semesterInitialState,
	semesterReducer,
} from '../reducers/semesterReducer'
import { SEMESTER_ACTIONS } from '../actions/semesterActions'
import { useToast } from './ToastContext'

const SemesterContext = createContext({
	...semesterInitialState,
	getCurrentSemester: async () => {},
})

export const useSemester = () => {
	const context = useContext(SemesterContext)
	return context
}

export const useCurrentSemester = () => {
	const { semester, isLoading, getCurrentSemester } = useSemester()

	useEffect(() => {
		getCurrentSemester()
	}, [])

	return { isLoading, semester }
}

export const SemesterProvider = ({ children }) => {
	const { showToast } = useToast()

	const [state, dispatch] = useReducer(semesterReducer, semesterInitialState)

	const getCurrentSemester = async () => {
		dispatch({ type: SEMESTER_ACTIONS.LOAD_SEMESTER })
		try {
			const semester = await semesterService.getCurrentSemester()
			dispatch({
				type: SEMESTER_ACTIONS.LOAD_SEMESTER_SUCCESS,
				payload: semester,
			})
		} catch ({
			response: {
				data: { message },
				status,
			},
		}) {
			showToast({
				color: 'danger',
				message:
					status < 500
						? message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			dispatch({ type: SEMESTER_ACTIONS.STOP_LOADING })
		}
	}

	return (
		<SemesterContext.Provider
			value={{
				...state,
				getCurrentSemester,
			}}
		>
			{children}
		</SemesterContext.Provider>
	)
}
