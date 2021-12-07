import React from 'react'
import { Accordion } from 'react-bootstrap'
import ItemAccordion from './ItemAccordion'

export default function AccordionOne({ companies }) {
	return (
		<>
			<h4 style={{ color: '#07BCFF', fontWeight: '700' }}>
				Correos electrónicos de los socios de las GE
			</h4>

			<Accordion defaultActiveKey='0'>
				{companies.map(({ partners, id, name }) => (
					<ItemAccordion
						key={id}
						name={name}
						eventKey={id}
						partners={partners}
					/>
				))}
			</Accordion>
		</>
	)
}
