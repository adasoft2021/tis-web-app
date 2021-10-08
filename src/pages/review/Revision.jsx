import { useState } from 'react'
import Popup from './Popup'
import { Button, Container } from 'react-bootstrap'

const Revision = () => {
	const [show, setshow] = useState(false)
	return (
		<Container>
			<div>
				<Button variant='primary' onClick={() => setshow(true)}>
					REVISIÓN
				</Button>
				<Popup show={show} onHide={() => setshow(false)} />
			</div>
		</Container>
	)
}
export default Revision
