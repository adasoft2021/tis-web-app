import { createContext, useContext, useEffect, useState } from 'react'

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
	const [userType, setUserType] = useState(initialState)
	useEffect(() => {
		setUserType({ userType: userTypes.ADVISER })
	}, [])
	return (
		<UserTypeContext.Provider value={userType}>
			{children}
		</UserTypeContext.Provider>
	)
}
