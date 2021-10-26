import { Redirect } from 'wouter'
import PublicationView from '../../components/PublicationView'
import { PublicationProvider } from '../../context/providers/PublicationContext'
import { useUserType } from '../../context/providers/UserTypeContext'
import Page from '../Page'

export default function SpecificationSheet() {
	const { userType } = useUserType()

	if (!userType) {
		return <Redirect to='/' />
	}
	return (
		<Page>
			<PublicationProvider>
				<PublicationView
					title='Pliegos de especificaciones'
					message='No existen pliegos de especificaciones'
					buttonMessage='Nuevo Pliego de Especificaciones'
				/>
			</PublicationProvider>
		</Page>
	)
}
