import { createContext, useContext } from 'react'

export const userTypes = {
	ADVISER: 'ADVISER',
	COMPANY: 'COMPANY',
}
export const initialState = { userType: null }
const UserTypeContext = createContext(initialState)
export const useUserType = () => {
	const context = useContext(UserTypeContext)
	return context
}
export const UserTypeProvider = ({ children }) => {
	return (
		<UserTypeContext.Provider>
			{ children }
		</UserTypeContext.Provider>
	)
}
