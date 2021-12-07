import React from 'react'
import Page from '../Page'
import { Nav } from 'react-bootstrap'
import Styles from './components/Link.module.scss'
import { Link } from 'wouter'
export default function Reports() {
	return (
		<Page>
			<h2 style={{ fontWeight: '700' }}>Reportes</h2>
			<Nav className='flex-column'>
				<Link to='/historyCreatedSheets'>
					<Nav.Link className='d-inline-flex'>
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
				</Link>
				<Link to='/groupRegisteredCompanies'>
					<Nav.Link>
						<img src='/flecha.png' width='26' />
						<div className={`${Styles.Link} d-inline-flex`}>
							Grupo Empresas Inscritas en la Gestion Actual
						</div>
					</Nav.Link>
				</Link>
				<Link to='/groupInformationReport'>
					<Nav.Link>
						<img src='/flecha.png' width='26' />
						<div className={`${Styles.Link} d-inline-flex`}>
							Informacion de las Grupo Empresas
						</div>
					</Nav.Link>
				</Link>
				<Link to='/companyGroupResponses'>
					<Nav.Link>
						<img src='/flecha.png' width='26' />
						<div className={`${Styles.Link} d-inline-flex`}>
							Respuestas de las Grupo Empresas
						</div>
					</Nav.Link>
				</Link>
				<Link to='/reviews'>
					<Nav.Link>
						<img src='/flecha.png' width='26' />
						<div className={`${Styles.Link} d-inline-flex`}>
							Revisiones
						</div>
					</Nav.Link>
				</Link>
				<Link to='/proposalsHistory'>
					<Nav.Link>
						<img src='/flecha.png' width='26' />
						<div className={`${Styles.Link} d-inline-flex`}>
							Historial de Propuestas Creadas
						</div>
					</Nav.Link>
				</Link>
			</Nav>
		</Page>
	)
}
