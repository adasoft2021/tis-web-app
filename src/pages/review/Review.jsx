import { useEffect, useState } from 'react'
import Split from 'react-split-grid'
import { Button, Container, Nav, Navbar, Spinner } from 'react-bootstrap'
import { useReview } from '../../context/providers/ReviewContext'
import Grid from './Grid'
import Popup from './Popup'

export default function Review() {
	const [show, setshow] = useState(false)
	const { getReview, isLoading, error } = useReview()

	useEffect(() => {
		getReview(1)
	}, [])

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	}

	if (error) {
		return <p>{error.message}</p>
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
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<Button
								className='fw-bold rounded-pill'
								variant='info'
								onClick={() => setshow(!show)}
							>
								CALIFICAR
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Split minSize={100} cursor='ew-resize' render={Grid} />
			<Popup show={show} onHide={() => setshow(false)} />
		</>
	)
}
