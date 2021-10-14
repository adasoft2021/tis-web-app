import Publication from '../../components/Publication'
import { PUBLICATION_TYPE } from '../../constants/publication'
import { PublicationProvider } from '../../context/providers/PublicationContext'
import Page from '../Page'

export default function Announcement() {
	return (
		<Page>
			<PublicationProvider>
				<Publication
					title='Convocatorias'
					message='No existen convocatorias'
					buttonMessage='Nueva convocatoria'
					publicationType={PUBLICATION_TYPE.ANNOUNCEMENT}
				/>
			</PublicationProvider>
		</Page>
	)
}
