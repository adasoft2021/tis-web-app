import React from 'react'
import { Accordion, Row, Col } from 'react-bootstrap'

export default function ItemAccordion({ name, eventKey, partners }) {
	return (
		<Accordion.Item eventKey={eventKey}>
			<Accordion.Header>{name}</Accordion.Header>
			<Accordion.Body>
				{partners.map((S) => (
					<div key={S.id}>
						<Row className='d-inline-flex'>
							<Col>{S.name}:</Col>
							<Col
								style={{
									color: '#07BCFF',
									textDecoration: 'underline',
								}}
							>
								{S.email}
							</Col>
						</Row>
					</div>
				))}
			</Accordion.Body>
		</Accordion.Item>
	)
}
