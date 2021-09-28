import { Link } from 'wouter'
import Page from './Page'

export default function NotFoundPage() {
	return (
		<Page>
			<p style={{ fontSize: '1.4rem' }}>
				<span style={{ fontWeight: 'bold' }}>404</span> | Página no
				encontrada
			</p>
			<p>
				Volver al <Link to='/'>Inicio</Link>
			</p>
		</Page>
	)
}
