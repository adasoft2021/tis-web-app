import Acordion from '../../components/Acordion'
import './HistoryCreatedSheets.scss'
import Page from '../Page'
import { PublicationProvider } from '../../context/providers/PublicationContext'
function HistoryCreatedSheets() {
	return (
		<Page>
			<a title='Los Tejos' href='/reports'>
				<img src='/flechaAtras.png' width='30' />
			</a>

			<h3 style={{ fontWeight: '700' }}>
				Reportes de Historial de Plieglos Creados
			</h3>
			<PublicationProvider>
				<Acordion />
			</PublicationProvider>
		</Page>
	)
}

export default HistoryCreatedSheets
