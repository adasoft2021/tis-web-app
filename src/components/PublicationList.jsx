import { Button, Col, Row, Spinner, Container } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import { useLocation } from 'wouter'
import { useState } from 'react'
import { useAllAdviserPublications } from '../context/providers/PublicationContext'
import PublicationCard from './PublicationCard'
import PostForm from './PostForm'

const NewPostButton = ({ buttonMessage }) => {
	const [show, setshow] = useState(false)
	return (
		<Container>
			<Button
				variant='info'
				className='rounded-circle'
				style={{ width: '56px', height: '56px' }}
				title={buttonMessage}
				onClick={() => setshow(true)}
			>
				<IoIosAdd className='text-light' size={32} />
			</Button>
			<PostForm
				header='Crear Convocatoria'
				show={show}
				onHide={() => setshow(false)}
				semester='2-2021'
			/>
		</Container>
	)
}
export default function PublicationList({ buttonMessage, message }) {
	const [location] = useLocation()
	const { isLoading, publications } = useAllAdviserPublications({
		adviserId: 1,
		publicationType: location.toUpperCase().replace('/', ''),
	})

	if (isLoading) {
		return (
			<div className='d-flex m-5 justify-content-center align-items-center'>
				<Spinner animation='border' />
			</div>
		)
	}

	if (!publications.length) {
		return (
			<div className='d-flex flex-column align-items-center m-5 gap-3'>
				<p className='text-muted display-6'>{message}</p>
				<NewPostButton buttonMessage={buttonMessage} />
			</div>
		)
	}

	return (
		<Row className='gy-4'>
			{publications.map(({ id, ...rest }) => (
				<PublicationCard key={id} id={id} {...rest} />
			))}
			<Col
				sm={4}
				className='d-flex align-items-center justify-content-center'
			>
				<NewPostButton buttonMessage={buttonMessage} />
			</Col>
		</Row>
	)
}
