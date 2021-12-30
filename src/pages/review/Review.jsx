import { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar, Spinner } from 'react-bootstrap'
import { useReviewById, useReview } from '../../context/providers/ReviewContext'
import Grid from './components/Grid'
import Popup from './components/Popup'

export default function Review({ reviewId }) {
	const [showPopup, setShowPopup] = useState(false)
	const { error: errorReview, isLoading, review } = useReviewById(reviewId)
	const { publishReview } = useReview()
	useEffect(() => {
		if (errorReview) {
			alert(JSON.stringify(errorReview))
		}
	}, [errorReview])

	if (isLoading) {
		return (
			<div className='d-flex m-5 justify-content-center align-items-center'>
				<Spinner animation='border' />
			</div>
		)
	}

	if (!review) {
		return null
	}

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
							<Nav className='ms-auto text-light d-flex align-items-center gap-3'>
								{review && review.published && (
									<span>
										{`Emitida como ${review.status
											.split('En ')
											.join('')}`}
									</span>
								)}
								{review.qualifications.length &&
								(review.status === 'Sin Revisar' ||
									review.status === 'Revisada' ||
									review.status === 'Calificada') ? (
									<Button
										className='fw-bold rounded-pill'
										variant='info'
										onClick={() => setShowPopup(true)}
									>
										{review.status === 'Calificada'
											? 'CALIFICACIÓN'
											: 'CALIFICAR'}
									</Button>
								) : null}
								{review && !review.published ? (
									<Button
										className='fw-bold rounded-pill'
										variant='success'
										disabled={review.published}
										onClick={() => {
											publishReview({
												reviewId: review.id,
											})
										}}
									>
										EMITIR
									</Button>
								) : null}
							</Nav>
						</Navbar.Collapse>
					)}
				</Container>
			</Navbar>
			<Popup show={showPopup} onHide={() => setShowPopup(false)} />
			<Grid />
		</>
	)
}
