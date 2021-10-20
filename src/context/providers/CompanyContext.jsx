import { createContext, useContext, useEffect, useReducer } from 'react'

import * as companyService from '../../services/companyService'
import { companyInitialState, companyReducer } from '../reducers/companyReducer'
import { COMPANY_ACTIONS } from '../actions/companyActions'
import { useToast } from './ToastContext'

const CompanyContext = createContext({
	...companyInitialState,
	getAllCompanies: async () => {},
	getCompany: async ({ companyId }) => {},
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

export const CompanyProvider = ({ children }) => {
	const { showToast } = useToast()

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
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
			dispatch({ type: COMPANY_ACTIONS.STOP_LOADING })
		}
	}
	const getCompany = async ({ companyId }) => {
		dispatch({ type: COMPANY_ACTIONS.LOAD_COMPANY })
		try {
			const company = await companyService.getCompany({ companyId })
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
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
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
			}}
		>
			{children}
		</CompanyContext.Provider>
	)
}
