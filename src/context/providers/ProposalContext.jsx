import { createContext, useContext, useEffect, useReducer } from 'react'
import * as proposalService from '../../services/proposalService'
import { PROPOSAL_ACTIONS } from '../actions/proposalActions'
import {
	proposalInitialState,
	proposalReducer,
} from '../reducers/proposalReducer'
import { useToast } from './ToastContext'
import { useUserCredentials } from './UserCredentialsContext'

export const ProposalContext = createContext({
	...proposalInitialState,
	getAllAdviserProposals: async () => {},
	getProposal: async ({ proposalId }) => {},
	getProposalsHistory: async () => {},
	getAnswerSpacesByProject: async ({ projectId }) => {},
})

export const useProposal = () => {
	const context = useContext(ProposalContext)

	return context
}

export function useProposalById(proposalId) {
	const { error, getProposal, isLoading, proposal } = useProposal()

	useEffect(async () => {
		getProposal({ proposalId })
	}, [])

	return { error, isLoading, proposal }
}

export const useListProposals = () => {
	const { error, getAllAdviserProposals, isLoading, proposals } =
		useProposal()

	useEffect(() => {
		getAllAdviserProposals()
	}, [])

	return { error, isLoading, proposals }
}

export const useProposalsHistory = () => {
	const { getProposalsHistory, isLoading, proposals } = useProposal()
	useEffect(() => {
		getProposalsHistory()
	}, [])
	return { isLoading, proposals }
}
export const useAnswerSpacesByProject = ({ projectId }) => {
	const { getAnswerSpacesByProject, isLoading, proposals } = useProposal()

	useEffect(() => {
		getAnswerSpacesByProject({ projectId })
	}, [])
	return { isLoading, proposals }
}
export const ProposalProvider = ({ children }) => {
	const { showToast } = useToast()
	const { id, token } = useUserCredentials()
	const [state, dispatch] = useReducer(proposalReducer, proposalInitialState)

	const getAllAdviserProposals = async () => {
		dispatch({ type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS })
		try {
			const proposals = await proposalService.getAllAdviserProposals({
				token,
				adviserId: id,
			})
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_SUCCESS,
				payload: proposals,
			})
		} catch ({ response: { data } }) {
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_ERROR,
				payload: data,
			})
		}
	}

	const getProposal = async ({ proposalId }) => {
		dispatch({ type: PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL })
		try {
			const proposal = await proposalService.getProposal({
				token,
				proposalId,
			})
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL_SUCCESS,
				payload: proposal,
			})
		} catch ({ response: { data, status }, ...rest }) {
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_GET_PROPOSAL_ERROR,
				payload:
					status < 500
						? data.message
						: 'Ocurrió algún error con el servidor. Intente más tarde.',
			})
		}
	}

	const getProposalsHistory = async () => {
		dispatch({ type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS })
		try {
			const proposals = await proposalService.getProposalsHistory({
				adviserId: id,
				token,
			})
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_SUCCESS,
				payload: proposals,
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
						: 'El servicio no está disponible en estos momentos',
			})
			dispatch({ type: PROPOSAL_ACTIONS.STOP_LOADING })
		}
	}

	const getAnswerSpacesByProject = async ({ projectId }) => {
		dispatch({ type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS })
		try {
			const proposals = await proposalService.getAnswerSpacesByProject({
				token,
				adviserId: id,
				projectId,
			})
			dispatch({
				type: PROPOSAL_ACTIONS.LOAD_LIST_PROPOSALS_SUCCESS,
				payload: proposals,
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
						: 'El servicio no está disponible en estos momentos',
			})
			dispatch({ type: PROPOSAL_ACTIONS.STOP_LOADING })
		}
	}
	return (
		<ProposalContext.Provider
			value={{
				...state,
				getAllAdviserProposals,
				getProposal,
				getProposalsHistory,
				getAnswerSpacesByProject,
			}}
		>
			{children}
		</ProposalContext.Provider>
	)
}
