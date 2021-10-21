import { createContext } from 'react'

export const userTypes = {
	ADVISER: 'ADVISER',
	COMPANY: 'COMPANY',
}
export const initialState = { userType: userTypes.ADVISER }
const UserTypeContext = createContext(...initialState)

export default UserTypeContext
