import { createContext, useContext } from 'react'

export const userTypes = {
	ADVISER: 'ADVISER',
	COMPANY: 'COMPANY',
}
export const initialState = { userType: userTypes.ADVISER }
const UserTypeContext = createContext(...initialState)
export const useUserType = () => {
	const context = useContext(UserTypeContext)
	return context
}
export const UserTypeProvider = ({ state, children }) => {
	return (
		<UserTypeContext.Provider value={state}>
			{children}
		</UserTypeContext.Provider>
	)
}
