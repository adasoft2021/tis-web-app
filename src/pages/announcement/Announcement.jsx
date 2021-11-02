import { Redirect } from 'wouter'
import PublicationView from '../../components/PublicationView'
import { PublicationProvider } from '../../context/providers/PublicationContext'
import { useUserCredentials } from '../../context/providers/UserCredentialsContext'
import Page from '../Page'

export default function Announcement() {
	const { userType } = useUserCredentials()

	if (!userType) {
		return <Redirect to='/' />
	}

	return (
		<Page>
			<PublicationProvider>
				<PublicationView
					title='Convocatorias'
					message='No existen convocatorias'
					buttonMessage='Nueva Convocatoria'
				/>
			</PublicationProvider>
		</Page>
	)
}
