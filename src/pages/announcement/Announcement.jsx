import { Redirect } from 'wouter'
import PublicationView from '../../components/PublicationView'
import { PublicationProvider } from '../../context/providers/PublicationContext'
import { useUserType } from '../../context/providers/UserTypeContext'
import Page from '../Page'

export default function Announcement() {
	const { userType } = useUserType()

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
