import { createContext, useContext, useEffect, useReducer } from 'react'

import * as companyService from '../../services/companyService'
import { companyInitialState, companyReducer } from '../reducers/companyReducer'
import { COMPANY_ACTIONS } from '../actions/companyActions'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

const CompanyContext = createContext({
	...companyInitialState,
	getAllCompanies: async () => {},
	getCompany: async () => {},
	registerCompany: async ({ registrationCode, companyDTO }) => {},
	updateCompany: async ({ companyDTO, companyId }) => {},
	getActualCompanies: async () => {},
	getCompanyExtendedVersion: async () => {},
})

export const useCompany = () => {
	const context = useContext(CompanyContext)

	return context
}

export const useAllCompanies = () => {
	const { getAllCompanies, isLoading, companies } = useCompany()

	useEffect(() => {
		getAllCompanies()
	}, [])

	return { isLoading, companies }
}
export const useGetCompany = () => {
	const { getCompany, isLoading, company } = useCompany()

	useEffect(() => {
		getCompany()
	}, [])

	return { isLoading, company }
}
export const useActualCompanies = () => {
	const { getActualCompanies, isLoading, companies } = useCompany()
	useEffect(() => {
		getActualCompanies()
	}, [])

	return { isLoading, companies }
}

export const useGetCompanyExtendedVersion = () => {
	const { getCompanyExtendedVersion, isLoading, company } = useCompany()

	useEffect(() => {
		getCompanyExtendedVersion()
	}, [])

	return { isLoading, company }
}

export const CompanyProvider = ({ children }) => {
	const { showToast } = useToast()
	const { setUserCredentials, token, id } = useUserCredentials()

	const [state, dispatch] = useReducer(companyReducer, companyInitialState)

	const getAllCompanies = async () => {
		dispatch({ type: COMPANY_ACTIONS.LOAD_COMPANIES_LIST })
		try {
			const companies = await companyService.getAllCompanies()
			dispatch({
				type: COMPANY_ACTIONS.LOAD_COMPANIES_LIST_SUCCESS,
				payload: companies,
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
						: 'Ocurri?? alg??n error con el servidor. Intente m??s tarde.',
			})
			dispatch({ type: COMPANY_ACTIONS.STOP_LOADING })
		}
	}

	const getCompany = async () => {
		dispatch({ type: COMPANY_ACTIONS.LOAD_COMPANY })
		try {
			const company = await companyService.getCompany({
				token,
				companyId: id,
			})
			dispatch({
				type: COMPANY_ACTIONS.LOAD_COMPANY_SUCCESS,
				payload: company,
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
						: 'Ocurri?? alg??n error con el servidor. Intente m??s tarde.',
			})
			dispatch({ type: COMPANY_ACTIONS.STOP_LOADING })
		}
	}

	const registerCompany = async ({ registrationCode, companyDTO }) => {
		dispatch({ type: COMPANY_ACTIONS.LOAD_REGISTER_COMPANY })
		try {
			const credentials = await companyService.registerCompany({
				registrationCode,
				companyDTO,
			})
			setUserCredentials(credentials)
			showToast({ color: 'success', message: 'Se ha registrado la GE' })
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
						: 'El servicio no est?? disponible en estos momentos',
			})
			dispatch({ type: COMPANY_ACTIONS.STOP_LOADING })
		}
	}

	const updateCompany = async ({ companyDTO, companyId }) => {
		dispatch({ type: COMPANY_ACTIONS.LOAD_UPDATE_COMPANY })
		try {
			const company = await companyService.updateCompany({
				token,
				companyDTO,
				companyId,
			})
			dispatch({
				type: COMPANY_ACTIONS.LOAD_UPDATE_COMPANY_SUCCESS,
				payload: company,
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
						: 'El servicio no est?? disponible en estos momentos',
			})
			dispatch({ type: COMPANY_ACTIONS.STOP_LOADING })
		}
	}

	const getActualCompanies = async () => {
		dispatch({ type: COMPANY_ACTIONS.LOAD_COMPANIES_LIST })
		try {
			const companies = await companyService.getActualCompanies({
				token,
				adviserId: id,
			})
			dispatch({
				type: COMPANY_ACTIONS.LOAD_COMPANIES_LIST_SUCCESS,
				payload: companies,
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
						: 'Ocurri?? alg??n error con el servidor. Intente m??s tarde.',
			})
			dispatch({ type: COMPANY_ACTIONS.STOP_LOADING })
		}
	}

	const getCompanyExtendedVersion = async () => {
		dispatch({ type: COMPANY_ACTIONS.LOAD_COMPANY })
		try {
			const company = await companyService.getCompanyExtendedVersion({
				companyId: id,
				token,
			})
			dispatch({
				type: COMPANY_ACTIONS.LOAD_COMPANY_SUCCESS,
				payload: company,
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
						: 'Ocurri?? alg??n error con el servidor. Intente m??s tarde.',
			})
			dispatch({ type: COMPANY_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<CompanyContext.Provider
			value={{
				...state,
				getAllCompanies,
				getCompany,
				registerCompany,
				updateCompany,
				getActualCompanies,
				getCompanyExtendedVersion,
			}}
		>
			{children}
		</CompanyContext.Provider>
	)
}
