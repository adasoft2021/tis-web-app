import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'

import { useAllAdviserPublications } from '../context/providers/PublicationContext'
import PublicationCard from './PublicationCard'

export default function PublicationList({
	buttonMessage,
	message,
	publicationType,
}) {
	const { isLoading, publications } = useAllAdviserPublications({
		adviserId: 1,
		publicationType,
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
				<Button
					variant='info'
					className='rounded-circle'
					style={{ width: '56px', height: '56px' }}
					title={buttonMessage}
				>
					<IoIosAdd className='text-light' size={32} />
				</Button>
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
				<Button
					variant='info'
					className='rounded-circle'
					style={{ width: '56px', height: '56px' }}
					title={buttonMessage}
				>
					<IoIosAdd className='text-light' size={32} />
				</Button>
			</Col>
		</Row>
	)
}
