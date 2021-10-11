import { useEffect, useState } from 'react'
import Popup from './Popup'
import { Button, Container } from 'react-bootstrap'
import { useReview } from '../../context/providers/ReviewContext'

const Revision = () => {
	const [show, setshow] = useState(false)
	const { review, getReview } = useReview()

	useEffect(() => {
		getReview(1)
		console.log(review)
	}, [])

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
