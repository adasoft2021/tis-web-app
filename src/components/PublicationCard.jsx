import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdTimer } from 'react-icons/md'

export default function PublicationCard({ id, title, code, date }) {
	const handleUpdate = () => {
		console.log(`Actualizando publicacion con ID ${id}`)
	}
	const handleDelete = () => {
		console.log(`Eliminando publicacion con ID ${id}`)
	}

	const showDate = (date) => {
		return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
	}

	return (
		<Col sm={4}>
			<Card className='shadow p-3 bg-body rounded'>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Subtitle className='mb-2 text-muted'>
						<small>{code}</small>
					</Card.Subtitle>
					<Card.Body className='d-flex align-items-center justify-content-between px-0 gap-2'>
						<p>
							<MdTimer size={24} /> {showDate(date)}
						</p>
						<div className='d-flex gap-2'>
							<Button
								variant='dark'
								className='rounded-circle'
								onClick={handleUpdate}
							>
								<FiEdit2 />
							</Button>
							<Button
								variant='dark'
								className='rounded-circle'
								onClick={handleDelete}
							>
								<RiDeleteBin6Line />
							</Button>
						</div>
					</Card.Body>
				</Card.Body>
			</Card>
		</Col>
	)
}
