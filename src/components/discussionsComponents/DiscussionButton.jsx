import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Link } from 'wouter'

export default function DiscussionButton() {
	return (
		<Link to='/discussionPAge'>
			<Nav.Link eventKey='/discussionPage'>
				<Button className='btn-warning' style={{ color: 'white' }}>
					Espacio de discusión
				</Button>
			</Nav.Link>
		</Link>
	)
}
