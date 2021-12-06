import React from 'react'
import Page from '../Page'
import { Nav } from 'react-bootstrap'
export default function Reports() {
	return (
		<Page>
			<h2 style={{ fontWeight: '700' }}>Reportes</h2>
			<Nav defaultActiveKey='/' className='flex-column'>
				<Nav.Link href='/historyCreatedSheets'>
					Historial de Pliegos Creados
				</Nav.Link>
				<Nav.Link href='/groupRegisteredCompanies'>
					Grupo Empresas Inscritas en la Gestion Actual
				</Nav.Link>
				<Nav.Link href='/groupInformationReport'>
					Informacion de las Grupo Empresas
				</Nav.Link>
				<Nav.Link href='/companyGroupResponses'>
					Respuestas de las Grupo Empresas
				</Nav.Link>
				<Nav.Link href='/'>Revisiones</Nav.Link>
				<Nav.Link href='/'>Historial de Propuestas Creadas</Nav.Link>
			</Nav>
		</Page>
	)
}
