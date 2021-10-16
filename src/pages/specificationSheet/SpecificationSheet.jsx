import PublicationView from '../../components/PublicationView'
import { PublicationProvider } from '../../context/providers/PublicationContext'
import Page from '../Page'

export default function SpecificationSheet() {
	return (
		<Page>
			<PublicationProvider>
				<PublicationView
					title='Publicacion de especificaciones'
					message='No existen pliegos de especificaciones'
					buttonMessage='Nuevo pliego de especificaciones'
				/>
			</PublicationProvider>
		</Page>
	)
}
