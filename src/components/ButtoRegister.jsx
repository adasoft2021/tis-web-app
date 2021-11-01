import React from 'react'
import { Button } from 'react-bootstrap'
import CGRegistrationForm from './CGregistrationForm'
export default function ButtonInformattionGE() {
	const [modalShow, setModalShow] = React.useState(false)
	return (
		<>
			<Button variant='primary' onClick={() => setModalShow(true)}>
				Registrar G.E.
			</Button>

			<CGRegistrationForm
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	)
}
