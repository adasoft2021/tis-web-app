import { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useReviewById } from '../../context/providers/ReviewContext'
import Grid from './components/Grid'
import Popup from './components/Popup'

export default function Review({ reviewId }) {
	const [showPopup, setShowPopup] = useState(false)

	const { error: errorReview, review } = useReviewById(reviewId)

	useEffect(() => {
		if (errorReview) {
			alert(errorReview)
		}
	}, [errorReview])

	return (
		<>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>
						<img
							src='/favicon.ico'
							width='30'
							height='30'
							className='d-inline-block align-top'
						/>
						TIS
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					{!errorReview && (
						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='ms-auto'>
								<p>
									{review && review.published
										? 'EMITIDA'
										: 'SIN EMITIR'}
								</p>
							</Nav>
							<Nav className='ms-auto'>
								<Button
									className='fw-bold rounded-pill'
									variant='info'
									onClick={() => setShowPopup(true)}
								>
									CALIFICAR
								</Button>
							</Nav>
							{review && !review.published && (
								<Nav className='ms-auto'>
									<Button
										className='fw-bold rounded-pill'
										variant='success'
										disabled={review.published}
									>
										EMITIR
									</Button>
								</Nav>
							)}
						</Navbar.Collapse>
					)}
				</Container>
			</Navbar>
			<Popup show={showPopup} onHide={() => setShowPopup(false)} />
			<Grid />
		</>
	)
}
