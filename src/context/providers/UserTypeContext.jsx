import { createContext, useContext } from 'react'

export const userTypes = {
	ADVISER: 'ADVISER',
	COMPANY: 'COMPANY',
	ANONYMOUS: 'ANONYMOUS',
}
export const initialState = { userType: userTypes.ANONYMOUS }
const UserTypeContext = createContext()
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
