import { Accordion, Card, Row } from 'react-bootstrap'

export default function AccordionItem({ header, body }) {
	return (
		<Accordion defaultActiveKey='0'>
			<Card>
				<Card.Header>
					<Row>{header}</Row>
				</Card.Header>
				<Accordion.Collapse eventKey='1'>
					<Card.Body>
						<Row>{body}</Row>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	)
}
