import { Card, Nav } from 'react-bootstrap'
import { Link } from 'wouter'
import { useUserCredentials } from '../../../context/providers/UserCredentialsContext'

function useClassName(userId) {
	const { id } = useUserCredentials()

	return id === userId ? 'bg-info' : ''
}

function showDate(date) {
	const d = new Date(date)
	return d.toLocaleDateString()
}

export default function CardDiscussion({ id, title, createdAt, createdById }) {
	const className = useClassName(createdById)

	return (
		<Card>
			<Card.Body className={className}>
				<Card.Title>{title}</Card.Title>
				<div className='d-flex justify-content-between align-items-center'>
					<Link to={`/discussions/${id}`}>
						<Nav.Link className='p-0'>
							<u>Comentarios</u>
						</Nav.Link>
					</Link>
					<small className='text-secondary'>
						{showDate(createdAt)}
					</small>
				</div>
			</Card.Body>
		</Card>
	)
}
