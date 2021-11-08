import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'wouter'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'
import { userTypes } from '../context/reducers/userCredentialsReducer'

export default function RegisterButton() {
	const { token, userType } = useUserCredentials(useUserCredentials)
	const [location] = useLocation()
	if (token) {
		switch (userType) {
			case userTypes.ADVISER:
				return (
					<Nav.Link>
						<Button variant='primary'>Cerrar Sesion</Button>
					</Nav.Link>
				)

			case userTypes.COMPANY:
				return (
					<Nav.Link>
						<Button variant='primary'>
							Subir informacion adicional
						</Button>
					</Nav.Link>
				)
		}
	}
	if (location === '/register') {
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
