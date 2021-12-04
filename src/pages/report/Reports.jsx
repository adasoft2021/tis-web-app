import React from 'react'
import Page from '../Page'
import { Nav } from 'react-bootstrap'
export default function Reports() {
	return (
		<Page>
			<Nav>
				<Nav.Link href='/historyCreatedSheets'>
					Historial de Pliegos Creados
				</Nav.Link>
				<Nav.Link href='/'>
					Grupo Empresas Inscritas en la Gestion Actual
				</Nav.Link>
				<Nav.Link href='/'>Informacion de las Grupo Empresas</Nav.Link>
				<Nav.Link href='/'>Respuestas de las Grupo Empresas</Nav.Link>
				<Nav.Link href='/'>Revisiones</Nav.Link>
				<Nav.Link href='/'>Historial de Propuestas Creadas</Nav.Link>
			</Nav>
		</Page>
	)
}
