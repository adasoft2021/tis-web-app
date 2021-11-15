import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import Page from '../Page'
import ReviewForm from './ReviewForm'

export const ReviewsList = () => {
	const [show, setShow] = useState(false)
	return (
		<Page>
			<h2>Revisiones</h2>
			<center>
				<Button
					variant='info'
					className='rounded-circle'
					style={{ width: '56px', height: '56px' }}
					title='Crear nueva revisión'
					onClick={() => setShow(true)}
				>
					<IoIosAdd className='text-light' size={32} />
				</Button>
			</center>
			<ReviewForm show={show} onHide={() => setShow(false)} />
		</Page>
	)
}
