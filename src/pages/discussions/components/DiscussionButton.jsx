import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Link } from 'wouter'

export default function DiscussionButton() {
	return (
		<Link to='/discussions'>
			<Nav.Link eventKey='/discussions'>
				<Button className='btn-warning' style={{ color: 'white' }}>
					Espacio de discusión
				</Button>
			</Nav.Link>
		</Link>
	)
}
