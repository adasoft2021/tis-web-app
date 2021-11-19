import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Modal, Form, Row, InputGroup, Button } from 'react-bootstrap'
import CloseButton from './CloseButton'
import getToDay from './getToDay'
import { useProject } from '../../context/providers/ProjectContext'

const SignupForm = ({ show, onHide }) => {
	const formik = useFormik({
		initialValues: {
			title: '',
			proyectTis: '',
			date: '',
			description: '',
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required('Campo obligatorio')
				.min(10, 'Este campo debe contener mínimo 10 caracteres.')
				.max(40, 'Este campo debe contener máximo 40 caracteres.'),
			proyectTis: Yup.string().required('Campo obligatorio'),
			date: Yup.date()
				.required('Campo obligatorio')
				.min(getToDay(), 'La fecha es incorrecta'),
			description: Yup.string()
				.required('Campo obligatorio')
				.min(10, 'Este campo debe contener mínimo 10 caracteres.')
				.max(100, 'Este campo debe contener máximo 100 caracteres.'),
		}),

		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2))
		},
	})
	const { projects, getAdviserProjects } = useProject()
	useEffect(() => {
		getAdviserProjects()
	}, [])
	const listProyects = projects.map((name) => (
		<option key={name.toString()}>{name}</option>
	))
	return (
		<Modal
			show={show}
			onHide={onHide}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			backdrop='static'
			onEscapeKeyDown
		>
			<Form className='bg-dark text-light' onSubmit={formik.handleSubmit}>
				<Row className='m-5'>
					<CloseButton onHide={onHide} formik={formik} />
					<Form.Group controlId='title'>
						<center className='mb-3'>
							<h2>Crear Espacios de Seguimiento</h2>
							<h4>Desarrollo del proyecto</h4>
						</center>
						<Form.Label className='fs-4'>Título</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								className='mb-2'
								onChange={formik.handleChange}
								value={formik.values.title}
								isInvalid={
									formik.touched.title && formik.errors.title
								}
							/>
							<Form.Control.Feedback type='invalid'>
								{formik.errors.title}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>

					<Form.Group controlId='proyectTis'>
						<Form.Label className='fs-4'>Proyecto TIS</Form.Label>
						<InputGroup hasValidation>
							<Form.Select
								onChange={formik.handleChange}
								value={formik.values.proyectTis}
								isInvalid={
									formik.touched.proyectTis &&
									formik.errors.proyectTis
								}
							>
								<option></option>
								{listProyects}
							</Form.Select>

							<Form.Control.Feedback type='invalid'>
								{formik.errors.proyectTis}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group controlId='date'>
						<Form.Label className='fs-4'>Fecha</Form.Label>
						<Form.Control
							type='date'
							min={getToDay()}
							onChange={formik.handleChange}
							value={formik.values.date}
							isInvalid={
								formik.touched.date && formik.errors.date
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.date}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId='description'>
						<Form.Label className='fs-4'>Descripcion</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								style={{ resize: 'none' }}
								as='textarea'
								rows={3}
								onChange={formik.handleChange}
								value={formik.values.description}
								isInvalid={
									formik.touched.description &&
									formik.errors.description
								}
							></Form.Control>

							<Form.Control.Feedback type='invalid'>
								{formik.errors.description}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>

					<center>
						<Button className='m-3' type='submit' variant='success'>
							CREAR
						</Button>
					</center>
				</Row>
			</Form>
		</Modal>
	)
}
export default SignupForm
