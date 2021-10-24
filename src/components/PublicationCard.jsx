import { Button, Card, Col } from 'react-bootstrap'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdTimer } from 'react-icons/md'
import { usePublication } from '../context/providers/PublicationContext'
import PostForm from './PostForm'
import { useState } from 'react'

export default function PublicationCard({
	buttonMessage,
	id,
	title,
	code,
	date,
	fileUrl,
	semester,
	...rest
}) {
	const { updatePublication, deletePublication, loadPublicationToUpdate } =
		usePublication()

	const handleUpdate = () => {
		loadPublicationToUpdate({
			publicationDTO: { id, title, code, date, fileUrl, ...rest },
		})
		setShowEdit(true)
	}
	const handleDelete = () => {
		deletePublication({ publicationId: id })
	}

	const showDate = (date) => {
		date = new Date(date)
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
	}

	const [showEdit, setShowEdit] = useState(false)

	return (
		<Col sm={4}>
			<Card className='shadow p-3 bg-body rounded'>
				<Card.Body>
					<Card.Title>
						<a target='_blank' href={fileUrl} className='link-dark'>
							{title}
						</a>
					</Card.Title>
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
							<PostForm
								header={'Editar ' + buttonMessage.slice(6)}
								show={showEdit}
								onHide={() => setShowEdit(false)}
								buttonForm={'GUARDAR'}
								semester={semester}
								withDTO={({ publicationDTO }) =>
									updatePublication({
										publicationId: id,
										publicationDTO: publicationDTO,
									})
								}
								dto={{ id, title, code, date, fileUrl }}
							/>
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
