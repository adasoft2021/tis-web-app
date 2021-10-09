import { Button, Form } from 'react-bootstrap'
import {
	IoIosSync,
	IoMdSend,
	IoIosWarning,
	IoMdCheckmark,
} from 'react-icons/io'
import { useState } from 'react'
import { useWelcome } from '../../context/providers/WelcomeContext'
import Page from '../Page'

export default function HomePage() {
	const { errorMessage, isLoading, loadMessage, message } = useWelcome()
	const [showMessage, setShowMessage] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		await loadMessage(e.target[0].value)
		setShowMessage(true)
	}

	return (
		<Page>
			{showMessage ? (
				<>
					<h1>Respuesta de la API:</h1>
					<p style={{ textAlign: 'center', maxWidth: '80vw' }}>
						{isLoading ? (
							<IoIosSync />
						) : (
							<>
								{errorMessage ? (
									<>
										<IoIosWarning className='text-warning' />{' '}
										{errorMessage}{' '}
									</>
								) : (
									<>
										<IoMdCheckmark className='text-success' />{' '}
										{message}
									</>
								)}
							</>
						)}
					</p>
				</>
			) : (
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3'>
						<Form.Label htmlFor='username'>
							Nombre de usuario:
						</Form.Label>
						<Form.Control
							id='username'
							name='username'
							placeholder='Ingrese su nombre de usuario'
						/>
					</Form.Group>
					<Button type='submit'>
						Enviar <IoMdSend />
					</Button>
				</Form>
			)}
		</Page>
	)
}
