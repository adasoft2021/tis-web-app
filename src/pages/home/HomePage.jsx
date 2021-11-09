import { Redirect } from 'wouter'
import PublicationView from '../../components/PublicationView'
import { PublicationProvider } from '../../context/providers/PublicationContext'
import { useUserCredentials } from '../../context/providers/UserCredentialsContext'
import Page from '../Page'

export default function HomePage() {
	const { userType } = useUserCredentials()

	if (userType) {
		return <Redirect to='/announcements' />
	}

	return (
		<Page>
			<div className='my-5'>
				<PublicationProvider>
					<PublicationView
						title='Convocatorias Publicadas'
						message='No existen convocatorias'
						buttonMessage='Nueva Convocatoria'
					/>
				</PublicationProvider>
			</div>
		</Page>
	)
}
