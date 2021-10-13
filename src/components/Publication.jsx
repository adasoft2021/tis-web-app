import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import { useAllAdviserPublications } from '../context/providers/PublicationContext'
import PublicationCard from './PublicationCard'

export default function Publication({
	title,
	message,
	buttonMessage,
	publicationType,
}) {
	const { errorPublications, isLoading, publications } =
		useAllAdviserPublications({
			adviserId: 1,
			publicationType,
		})

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	}

	if (errorPublications) {
		return <p>{errorPublications}</p>
	}

	return (
		<Container>
			<h2>{title}</h2>
			{isLoading ? (
				<div className='d-flex w-100 justify-content-center m-5'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : (
				<>
					{publications.length === 0 ? (
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
					) : (
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
									<IoIosAdd
										className='text-light'
										size={32}
									/>
								</Button>
							</Col>
						</Row>
					)}
				</>
			)}
		</Container>
	)
}
