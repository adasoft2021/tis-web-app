import { Redirect } from 'wouter'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'

const ProtectedRoute = ({
	companyView = null,
	adviserView = null,
	guestView = <Redirect to='/' />,
}) => {
	const { userType } = useUserCredentials()
	if (userType === 'COMPANY') {
		if (companyView) {
			return <> {companyView}</>
		}
	}
	if (userType === 'ADVISER') {
		if (adviserView) {
			return <> {adviserView} </>
		}
	}
	return <> {guestView} </>
}

export default ProtectedRoute
