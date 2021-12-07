import React from 'react'
import { Nav } from 'react-bootstrap'
import Page from '../Page'
import Styles from './components/Link.module.scss'

export default function CompanyGroupResponses() {
	return (
		<Page>
			<a title='Los Tejos' href='/reports'>
				<img src='/flechaAtras.png' width='30' />
			</a>

			<h3 className='p-3' style={{ fontWeight: '700' }}>
				Respuestas de las Grupo Empresas
			</h3>
			<Nav className='flex-column'>
				<Nav.Link href='/tableProposalTimes' className='d-inline-flex'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						Tiempos de presentación de propuestas
					</div>
				</Nav.Link>

				<Nav.Link href='/tableSignedCompanyGroup'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						N° de las GE que han firmado contrato y N° que faltan
						firmar
					</div>
				</Nav.Link>
				<Nav.Link href='/tableChangeOrders'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						Ordenes de cambio de que se respondieron
					</div>
				</Nav.Link>
				<Nav.Link href='/tableGEwithSlopes'>
					<img src='/flecha.png' width='26' />
					<div className={`${Styles.Link} d-inline-flex`}>
						GE que tienen pendientes
					</div>
				</Nav.Link>
			</Nav>
		</Page>
	)
}
