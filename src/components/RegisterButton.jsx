import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'wouter'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'
import { userTypes } from '../context/reducers/userCredentialsReducer'

export default function RegisterButton() {
	const { id, userType } = useUserCredentials(useUserCredentials)
	const [location] = useLocation()
	if (id) {
		switch (userType) {
			case userTypes.ADVISER:
			case userTypes.COMPANY:
				return (
					<Nav.Link>
						<Button variant='primary'>Cerrar Sesion</Button>
					</Nav.Link>
				)
		}
	}
	if (location === '/register' || location === '/additional-info') {
		return null
	}

	return (
		<Link to='/register'>
			<Nav.Link eventKey='/register'>
				<Button variant='primary'>Registrar G.E.</Button>
			</Nav.Link>
		</Link>
	)
}
