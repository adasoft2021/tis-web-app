import { Button, Form } from 'react-bootstrap'
import { IoMdAdd } from 'react-icons/io'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useDiscussion } from '../context/providers/DiscussionContext'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './ConversationForm.module.scss'

export default function ConversationForm({ add = false }) {
	const { createDiscussion, companyId } = useDiscussion()

	const conversationSchema = Yup.object().shape({
		text: add
			? Yup.string()
					.min(5, 'Este campo admite minimo 5 caracteres')
					.max(40, 'Este campo admite maximo 40 caracteres')
					.required('Este campo es obligatorio')
			: Yup.string()
					.min(5, 'Este campo admite minimo 5 caracteres')
					.max(255, 'Este campo admite maximo 40 caracteres')
					.required('Este campo es obligatorio'),
	})
	return (
		<Formik
			initialValues={{ text: '' }}
			validationSchema={conversationSchema}
			onSubmit={(values) => {
				if (add)
					createDiscussion({
						discussionDTO: { topic: values.text, companyId },
					})
				/* usar metodo para crear comentario si add===false */
			}}
			validateOnMount
			validateOnBlur
			validateOnChange
		>
			{({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
				<Form
					onSubmit={handleSubmit}
					className={`${styles.form} bg-info p-4 d-flex gap-4 align-items-end`}
				>
					<Form.Control
						id='text'
						className={styles.text}
						as={`${add ? 'input' : 'textarea'}`}
						placeholder={`${
							add
								? 'Escribir el tema de Discusión...'
								: 'Escribir comentario...'
						}`}
						rows={4}
						onChange={handleChange}
						onBlur={handleBlur}
						isInvalid={touched.text && errors.text}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.text}
					</Form.Control.Feedback>
					<Button
						className='rounded-pill'
						type='submit'
						disabled={errors.text}
					>
						{add ? (
							<IoMdAdd size={24} />
						) : (
							<RiSendPlaneFill size={24} />
						)}
					</Button>
				</Form>
			)}
		</Formik>
	)
}
