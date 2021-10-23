import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import { useLocation } from 'wouter'
import { useState, useEffect } from 'react'
import {
	useAllAdviserPublications,
	usePublication,
} from '../context/providers/PublicationContext'
import PublicationCard from './PublicationCard'
import PostForm from './PostForm'
import { useCurrentSemester } from '../context/providers/SemesterContext'

const NewPostButton = ({ buttonMessage, publicationType, adviserId }) => {
	const { semester } = useCurrentSemester()
	const { createPublication } = usePublication()
	const [show, setshow] = useState(false)
	useEffect(() => {
		console.log(semester)
	}, [semester])
	return (
		<center>
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
				semester={semester.semester || '2-2021'}
				withDTO={({ publicationDTO }) =>
					createPublication({
						publicationDTO: {
							...publicationDTO,
							type: publicationType,
							createdById: adviserId,
						},
					})
				}
			/>
		</center>
	)
}
export default function PublicationList({
	adviserId = 1,
	buttonMessage,
	message,
}) {
	const [location] = useLocation()
	const publicationType = location.toUpperCase().replace('/', '')
	const type = publicationType.slice(0, -1)
	const { isLoading, publications } = useAllAdviserPublications({
		adviserId: adviserId,
		publicationType: publicationType,
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
				<NewPostButton
					buttonMessage={buttonMessage}
					publicationType={type}
					adviserId={adviserId}
				/>
			</div>
		)
	}

	return (
		<Row className='gy-4'>
			{publications.map(({ id, ...rest }) => (
				<PublicationCard key={id} id={id} {...rest} />
			))}
			<Col className='d-flex align-items-center justify-content-center'>
				<NewPostButton
					buttonMessage={buttonMessage}
					publicationType={type}
					adviserId={adviserId}
				/>
			</Col>
		</Row>
	)
}
