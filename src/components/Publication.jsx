import { Button, Container } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'

export default function Publication({ title, message, buttonMessage }) {
	return (
		<Container>
			<h2>{title}</h2>
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
		</Container>
	)
}
