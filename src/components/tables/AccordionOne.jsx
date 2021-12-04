import React from 'react'
import { Accordion, Col, Row } from 'react-bootstrap'
import ItemAccordion from './ItemAccordion'

export default function AccordionOne() {
	return (
		<Row>
			<Col>
				<h4 style={{ color: '#07BCFF', fontWeight: '700' }}>
					Correos electrónicos de los socios de las GE
				</h4>
				<Accordion defaultActiveKey='0'>
					<ItemAccordion
						name='Grupo empresa 1'
						eventKey='0'
					></ItemAccordion>
					<ItemAccordion
						name='Grupo empresa 2'
						eventKey='1'
					></ItemAccordion>
					<ItemAccordion
						name='Grupo empresa 3'
						eventKey='2'
					></ItemAccordion>
				</Accordion>
			</Col>
			<Col></Col>
		</Row>
	)
}
