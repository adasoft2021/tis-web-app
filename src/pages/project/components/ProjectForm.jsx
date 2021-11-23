import { Formik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { PublicationProvider } from '../../../context/providers/PublicationContext'
import FormSelect from './FormSelect'
import * as yup from 'yup'

import styles from './ProjectForm.module.scss'
import { useProject } from '../../../context/providers/ProjectContext'

const initialValues = {
	title: '',
	announcementId: '',
	specificationSheetId: '',
}

const validationSchema = yup.object({
	title: yup
		.string()
		.required('Este campo es obligatorio.')
		.min(10, 'Este campo debe contener mínimo 10 caracteres.')
		.max(40, 'Este campo debe contener máximo 40 caracteres.'),
	announcementId: yup.number().required('Este campo es obligatorio.'),
	specificationSheetId: yup.number().required('Este campo es obligatorio.'),
})

/**
 * Función para verificar que los valores del Formulario estén vacíos.
 *
 * @param {{
 *      title: string,
 *      announcementId: number,
 *      specificationSheetId: number}} values los valores a verificar
 *
 * @returns true si los valores están vacíos y false si no lo están.
 */
const checkValues = ({ title, announcementId, specificationSheetId }) => {
	return !title && !announcementId && !specificationSheetId
}

export default function ProjectForm({ close, openDialog }) {
	const { createProject, projectDTO } = useProject()

	const handleExit = (values) => {
		if (checkValues(values)) {
			return close()
		}
		openDialog()
	}

	const onSubmit = async (values) => {
		const created = await createProject(values)
		if (created) {
			close()
		}
	}

	return (
		<Formik
			initialValues={
				projectDTO ? { ...projectDTO } : { ...initialValues }
			}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ errors, handleChange, handleSubmit, touched, values }) => (
				<>
					<div className='text-light'>
						<p className='text-end font-monospace fs-2 m-0'>
							<span
								className={styles.close}
								onClick={() => handleExit(values)}
							>
								X
							</span>
						</p>
						<p className='mt-0 h3 text-center'>Crear Proyecto</p>
					</div>
					<Form onSubmit={handleSubmit} noValidate>
						<Form.Group className='mt-4' controlId='title'>
							<Form.Label className='text-light'>
								Título
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								isInvalid={!!touched.title && !!errors.title}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.title}
							</Form.Control.Feedback>
						</Form.Group>
						<PublicationProvider>
							<FormSelect
								label='Convocatoria'
								name='announcementId'
								placeholder='Seleccione una Convocatoria'
								publicationType='ANNOUNCEMENTS'
							/>
						</PublicationProvider>
						<PublicationProvider>
							<FormSelect
								label='Pliego de Especificaciones'
								name='specificationSheetId'
								placeholder='Seleccione un Pliego de Especificaciones'
								publicationType='SPECIFICATION_SHEETS'
							/>
						</PublicationProvider>
						<div className='mt-4 d-flex justify-content-center'>
							<Button variant='success' type='submit'>
								CREAR
							</Button>
						</div>
					</Form>
				</>
			)}
		</Formik>
	)
}
