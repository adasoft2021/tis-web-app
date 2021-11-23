import { useState } from 'react'
import { Button } from 'react-bootstrap'
import PopUp from './PopUp'

export default function CreateProjectButton() {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)

	return (
		<>
			<Button onClick={() => setShow(true)}>Crear Proyecto</Button>
			<PopUp close={handleClose} show={show} />
		</>
	)
}
