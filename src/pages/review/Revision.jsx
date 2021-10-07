import { useState } from 'react'
import Popup from './Popup'
import { Button } from 'react-bootstrap'

const Revision = () => {
	const [show, setshow] = useState(false)
	return (
		<div>
			<Button variant='primary' onClick={() => setshow(true)}>
				REVISIÓN
			</Button>
			<Popup show={show} onHide={() => setshow(false)} />
		</div>
	)
}
export default Revision
