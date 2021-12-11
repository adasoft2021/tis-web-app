import { Button, Form } from 'react-bootstrap'
import { IoMdAdd } from 'react-icons/io'
import { RiSendPlaneFill } from 'react-icons/ri'

import styles from './ConversationForm.module.scss'

export default function ConversationForm({ add = false }) {
	return (
		<Form
			className={`${styles.form} bg-info p-4 d-flex gap-4 align-items-end`}
		>
			<Form.Control
				className={styles.text}
				as={`${add ? 'input' : 'textarea'}`}
				placeholder={`${
					add
						? 'Escribir el tema de Discusión...'
						: 'Escribir comentario...'
				}`}
				rows={4}
			/>
			<Button className='rounded-pill'>
				{add ? <IoMdAdd size={24} /> : <RiSendPlaneFill size={24} />}
			</Button>
		</Form>
	)
}
