import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react'

import * as classCodeService from '../../services/classCodeService'
import { CLASSCODE_ACTIONS } from '../actions/classCodeActions'
import {
	classCodeInitialState,
	classCodeReducer,
} from '../reducers/classCodeReducer'

import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

const ClassCodeContext = createContext({
	...classCodeInitialState,
	createClassCode: () => {},
	validateClassCode: ({ code }) => {},
})

export const useClassCode = () => {
	const context = useContext(ClassCodeContext)

	return context
}

export const useCreateClassCode = () => {
	const { isLoading, createClassCode, classCode } = useClassCode()
	const [create, setCreate] = useState(false)
	useEffect(() => {
		if (create) {
			createClassCode()
			setCreate(false)
		}
	}, [setCreate])
	return { isLoading, classCode, setCreate }
}

export const useValidateClassCode = () => {
	const { isLoading, validateClassCode, classCode } = useClassCode()
	const [code, setCode] = useState(null)
	useEffect(() => {
		if (code) validateClassCode({ code })
	}, [code])
	return { isLoading, classCode, setCode }
}

export const ClassCodeProvider = ({ children }) => {
	const { showToast } = useToast()
	const { token, id } = useUserCredentials()

	const [state, dispatch] = useReducer(
		classCodeReducer,
		classCodeInitialState
	)
	const createClassCode = async () => {
		dispatch({ type: CLASSCODE_ACTIONS.LOAD_CREATE_CLASSCODE })
		try {
			const { code } = await classCodeService.createClassCode({
				token,
				adviserId: id,
			})
			dispatch({
				type: CLASSCODE_ACTIONS.LOAD_CREATE_CLASSCODE_SUCCESS,
				payload: { code },
			})
		} catch ({ response }) {
			showToast({
				color: 'danger',
				message:
					response.status < 500
						? response.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			dispatch({ type: CLASSCODE_ACTIONS.STOP_LOADING })
		}
	}

	const validateClassCode = async ({ code }) => {
		showToast({
			color: 'info',
			message: 'El código de registro está siendo validado.',
		})
		dispatch({ type: CLASSCODE_ACTIONS.LOAD_VALIDATE_CLASSCODE })
		try {
			await classCodeService.validateClassCode({
				code,
			})
			showToast({
				color: 'success',
				message: 'Se ha validado el código de registro.',
			})
			dispatch({
				type: CLASSCODE_ACTIONS.LOAD_VALIDATE_CLASSCODE_SUCCESS,
				payload: { code },
			})
		} catch ({ response }) {
			showToast({
				color: 'danger',
				message:
					response.status < 500
						? response.status === 404
							? 'El código de registro es inválido.'
							: response.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			dispatch({ type: CLASSCODE_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<ClassCodeContext.Provider
			value={{
				...state,
				createClassCode,
				validateClassCode,
			}}
		>
			{children}
		</ClassCodeContext.Provider>
	)
}
