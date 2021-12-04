import React from 'react'
import { Accordion, Row, Col } from 'react-bootstrap'

export default function ItemAccordion({ name, eventKey, listS }) {
	const list = [
		{ id: 1, nombre: 'Juan', correo: 'juan@gmail.com' },
		{ id: 2, nombre: 'Pepe', correo: 'pepe@gmail.com' },
		{ id: 3, nombre: 'Laura', correo: 'laura@gmail.com' },
	]

	return (
		<Accordion.Item eventKey={eventKey}>
			<Accordion.Header>{name}</Accordion.Header>
			<Accordion.Body>
				{list.map((S) => (
					<div key={S.id}>
						<Row className='d-inline-flex'>
							<Col>socio {S.id}:</Col>
							<Col
								style={{
									color: '#07BCFF',
									textDecoration: 'underline',
								}}
							>
								{S.correo}
							</Col>
						</Row>
					</div>
				))}
			</Accordion.Body>
		</Accordion.Item>
	)
}
