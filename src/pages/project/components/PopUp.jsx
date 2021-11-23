import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ProjectForm from './ProjectForm'

export default function PopUp({ close, show }) {
	const [showDialog, setShowDialog] = useState(false)

	const openDialog = () => {
		setShowDialog(true)
	}

	return (
		<>
			<Modal show={show} backdrop='static' centered>
				<Modal.Body className='bg-dark px-5 py-4'>
					<ProjectForm close={close} openDialog={openDialog} />
				</Modal.Body>
			</Modal>

			<Modal size='sm' show={showDialog} centered>
				<Modal.Body>
					<p>
						¿Seguro que quiere salir? No se guardarán los cambios.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							setShowDialog(false)
							close()
						}}
					>
						Si
					</Button>
					<Button
						variant='info'
						onClick={() => {
							setShowDialog(false)
						}}
					>
						Seguir editando
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
