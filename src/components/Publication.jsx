import { Button, Col, Container, Row } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import PublicationCard from './PublicationCard'

const publications = [
	{
		id: 1,
		title: 'Convocatoria 1',
		date: new Date(),
		code: 'CPTIS-0609-2021',
		semester: '2-2021',
		fileUrl:
			'https://drive.google.com/file/d/1Y1UxDtPa7Qr7uPzJ32D6pB7nwbCrrXxe/view?usp=sharing',
		createdAt: new Date(),
		updatedAt: new Date(),
		deleted: false,
	},
	{
		id: 2,
		title: 'Convocatoria 2',
		date: new Date(),
		code: 'CPTIS-0609-2021',
		semester: '2-2021',
		fileUrl:
			'https://drive.google.com/file/d/1Y1UxDtPa7Qr7uPzJ32D6pB7nwbCrrXxe/view?usp=sharing',
		createdAt: new Date(),
		updatedAt: new Date(),
		deleted: false,
	},
	{
		id: 3,
		title: 'Convocatoria 2',
		date: new Date(),
		code: 'CPTIS-0609-2021',
		semester: '2-2021',
		fileUrl:
			'https://drive.google.com/file/d/1Y1UxDtPa7Qr7uPzJ32D6pB7nwbCrrXxe/view?usp=sharing',
		createdAt: new Date(),
		updatedAt: new Date(),
		deleted: false,
	},
	{
		id: 4,
		title: 'Convocatoria 2',
		date: new Date(),
		code: 'CPTIS-0609-2021',
		semester: '2-2021',
		fileUrl:
			'https://drive.google.com/file/d/1Y1UxDtPa7Qr7uPzJ32D6pB7nwbCrrXxe/view?usp=sharing',
		createdAt: new Date(),
		updatedAt: new Date(),
		deleted: false,
	},
]

export default function Publication({ title, message, buttonMessage }) {
	return (
		<Container>
			<h2>{title}</h2>
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
				<Row className='gy-3'>
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
			)}
		</Container>
	)
}
