import PublicationView from '../../components/PublicationView'
import { PublicationProvider } from '../../context/providers/PublicationContext'
import Page from '../Page'

export default function Announcement() {
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
