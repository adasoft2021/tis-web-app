import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import Page from '../Page'
import ReviewForm from './ReviewForm'
import { CompanyProvider } from '../../context/providers/CompanyContext'
import { ProyectProvider } from '../../context/providers/ProyectContext'
import { SpaceProvider } from '../../context/providers/SpaceContext'
import { ReviewProvider } from '../../context/providers/ReviewContext'

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
			<ProyectProvider>
				<CompanyProvider>
					<SpaceProvider>
						<ReviewProvider>
							<ReviewForm
								show={show}
								onHide={() => setShow(false)}
							/>
						</ReviewProvider>
					</SpaceProvider>
				</CompanyProvider>
			</ProyectProvider>
		</Page>
	)
}
