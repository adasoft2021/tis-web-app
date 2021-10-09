import { Button, Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsCheckCircle } from 'react-icons/bs'

export default function Observation() {
	return (
		<Form className='p-3 rounded d-flex gap-4 w-100 bg-dark'>
			<div className='flex-fill'>
				<Form.Control placeholder='Observación' className='mb-2' />
				<Form.Control
					placeholder='Descripción'
					as='textarea'
					rows={3}
					className='w-100'
				/>
			</div>
			<div className='d-flex flex-column justify-content-between'>
				<Button
					variant='danger'
					className='rounded-pill'
					disabled={true}
				>
					<RiDeleteBin6Line size={24} />
				</Button>
				<Button variant='info' className='rounded-pill' disabled={true}>
					<FiEdit size={24} />
				</Button>
				<Button variant='success' className='rounded-pill'>
					<BsCheckCircle size={24} />
				</Button>
			</div>
		</Form>
	)
}
