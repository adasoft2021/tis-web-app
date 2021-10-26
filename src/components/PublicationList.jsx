import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import { useLocation } from 'wouter'
import { useEffect, useState } from 'react'
import {
	useAllAdviserPublications,
	usePublication,
} from '../context/providers/PublicationContext'
import PublicationCard from './PublicationCard'
import PostForm from './PostForm'
import {
	useCurrentSemester,
	useSemester,
} from '../context/providers/SemesterContext'
import { userTypes, useUserType } from '../context/providers/UserTypeContext'

const validateDate = (datePublication) => {
	datePublication = new Date(datePublication)
	const currentDate = new Date()

	return datePublication > currentDate
}

const NewPostButton = ({ buttonMessage, publicationType, adviserId }) => {
	const { userType } = useUserType()
	const { semester } = useCurrentSemester()
	const { createPublication } = usePublication()
	const [show, setshow] = useState(false)

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
			{userType === userTypes.ADVISER && (
				<PostForm
					header={'Crear ' + buttonMessage.slice(6)}
					show={show}
					onHide={() => setshow(false)}
					buttonForm={'CREAR'}
					semester={semester ? semester.semester : '2-2021'}
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
			)}
		</center>
	)
}
export default function PublicationList({
	adviserId = 1,
	buttonMessage,
	message,
}) {
	const [filteredPublications, setFilteredPublications] = useState([])
	const { semester: currentSemester } = useSemester()
	const [location] = useLocation()
	const { userType } = useUserType()
	const publicationType =
		location === '/'
			? 'ANNOUNCEMENTS'
			: location.toUpperCase().replace('/', '')
	const type = publicationType.slice(0, -1)
	const { isLoading, publications } = useAllAdviserPublications({
		adviserId: adviserId,
		publicationType: publicationType,
	})

	useEffect(() => {
		setFilteredPublications(
			publications.filter((publication) => {
				if (userType === userTypes.ADVISER) {
					return true
				}
				return (
					publication.semester === currentSemester.semester &&
					!validateDate(publication.date)
				)
			})
		)
	}, [publications, userType])

	if (isLoading) {
		return (
			<div className='d-flex m-5 justify-content-center align-items-center'>
				<Spinner animation='border' />
			</div>
		)
	}

	if (!filteredPublications.length) {
		return (
			<div className='d-flex flex-column align-items-center m-5 gap-3'>
				<p className='text-muted display-6'>{message}</p>
				{userType === userTypes.ADVISER && (
					<NewPostButton
						buttonMessage={buttonMessage}
						publicationType={type}
						adviserId={adviserId}
					/>
				)}
			</div>
		)
	}

	return (
		<Row className='gy-4'>
			{filteredPublications.map(({ id, ...rest }) => (
				<PublicationCard
					key={id}
					buttonMessage={buttonMessage}
					id={id}
					{...rest}
				/>
			))}
			<Col className='d-flex align-items-center justify-content-center'>
				{userType === userTypes.ADVISER && (
					<NewPostButton
						buttonMessage={buttonMessage}
						publicationType={type}
						adviserId={adviserId}
					/>
				)}
			</Col>
		</Row>
	)
}
