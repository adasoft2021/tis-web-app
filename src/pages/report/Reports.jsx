import React from 'react'
import Page from '../Page'
import { Nav } from 'react-bootstrap'
import Styles from './components/Link.module.scss'
export default function Reports() {
	return (
		<Page>
			<h2 style={{ fontWeight: '700' }}>Reportes</h2>
			<Nav className='flex-column'>
				<Nav.Link
					href='/historyCreatedSheets'
					className='d-inline-flex'
				>
					<img src='/flecha.png' width='26' />
					<div
						style={{
							color: 'blue',
							textDecoration: 'underline',
						}}
					>
						Historial de Pliegos Creados
					</div>
				</Nav.Link>
				<Nav.Link href='/groupRegisteredCompanies'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						Grupo Empresas Inscritas en la Gestion Actual
					</div>
				</Nav.Link>
				<Nav.Link href='/groupInformationReport'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						Informacion de las Grupo Empresas
					</div>
				</Nav.Link>
				<Nav.Link href='/companyGroupResponses'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						Respuestas de las Grupo Empresas
					</div>
				</Nav.Link>
				<Nav.Link href='/'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						Revisiones
					</div>
				</Nav.Link>
				<Nav.Link href='/'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						Historial de Propuestas Creadas
					</div>
				</Nav.Link>
			</Nav>
		</Page>
	)
}
