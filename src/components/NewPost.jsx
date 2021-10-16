import React from 'react'
import { useFormik } from 'formik'
import { Modal, Row, Button, Form, InputGroup } from 'react-bootstrap'
import Styles from './NewPost.module.scss'
import { useToast } from '../context/providers/ToastContext'
import * as Yup from 'yup'
// import DatePicker from 'react-datepicker'

const getToDay = () => {
	const ToDay = new Date()
	const now = `${ToDay.getUTCFullYear()}-${
		ToDay.getUTCMonth() + 1
	}-${ToDay.getUTCDate()}`
	return now
}

const SignupForm = (props) => {
	const formik = useFormik({
		initialValues: {
			title: '',
			date: getToDay(),
			code: '',
			semester: '',
			attachedfile: '',
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required('Campo obligatorio')
				.min(15, 'Este campo debe contener mínimo 15 caracteres.')
				.max(70, 'Este campo debe contener máximo 70 caracteres.'),
			date: Yup.date()
				.required('Campo obligatorio')
				.min(getToDay(), 'La fecha es incorrecta'),
			code: Yup.string()
				.required('Campo obligatorio')
				.min(10, 'Este campo debe contener mínimo 10 caracteres.')
				.max(20, 'Este campo debe contener máximo 20 caracteres.')
				.matches(
					/^[A-Z0-9]+[-]{1}[A-Z0-9]+[-]{1}[A-Z0-9]+$/,
					'Este campo solo puede contener letras mayusculas, numeros con el siguiente formato Ej: (IPTI-234A-2021)'
				),
			semester: Yup.string()
				.required('Campo obligatorio')
				.matches(
					/^[12]{1}[-][0-9]{4}$/,
					'Por favor siga el siguiente formato Ej: (1-2021)'
				),
		}),

		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2))
		},
	})
	const x = () => {
		formik.setValues((value) => ({ ...value, code: '1-2022' }))
	}

	const { showToast } = useToast()
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			backdrop='static'
		>
			<Form className='bg-dark' onSubmit={formik.handleSubmit} noValidate>
				<div className='m-5'>
					<div className=' d-flex justify-content-end'>
						<Button
							className='text-light btn-danger'
							onClick={() =>
								confirm(
									' ¿Seguro que quiere salir? Se borrará los datos ingresados.'
								)
									? props.onHide()
									: null
							}
						>
							X
						</Button>
					</div>
					<Modal.Body className='text-light'>
						<Row>
							<center className='mb-3'>
								<h2>Nueva Convocatoria</h2>
							</center>
							<Form.Group controlId='title'>
								<Form.Label className='fs-4'>Titulo</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										className='mb-2'
										onChange={formik.handleChange}
										isInvalid={
											formik.touched.title &&
											formik.errors.title
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.title}
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
										formik.touched.date &&
										formik.errors.date
									}
								/>
								<Form.Control.Feedback type='invalid'>
									{formik.errors.date}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Label className='fs-4'>Codigo</Form.Label>
							<Form.Control
								className='mb-2 fluid="md"'
								id='code'
								name='code'
								type='text'
								onChange={formik.handleChange}
								value={formik.values.code}
							/>
							<div className='error text-danger'>
								{formik.errors.code}
							</div>
							<Form.Label className='fs-4'>Semestre</Form.Label>
							<Form.Control
								className='mb-2'
								id='semester'
								name='semester'
								type='text'
								onChange={formik.handleChange}
								value={formik.values.semester}
							/>
							<div className='error text-danger'>
								{formik.errors.semester}
							</div>
							<div className='mt-3 mb-3'>
								<Form.Label className='mb-2 fs-4'>
									Archivo adjunto
								</Form.Label>
								<Row
									className={`${Styles['drag-area']} rounded bg-light text-dark p-4`}
								>
									<Form.Group controlId='PDF'>
										<div className='d-flex flex-column align-items-center'>
											<h4>
												Arrastra y suelta tu archivo
											</h4>
											<h4>o</h4>
											<Form.Label className='btn btn-primary'>
												Selecciona tu archivo
											</Form.Label>
										</div>
										<Form.Control
											className={
												Styles['file-upload-input']
											}
											type='file'
											accept='application/pdf'
											onChange={(e) => {
												if (
													e.target.files[0].type !==
													'application/pdf'
												)
													showToast({
														color: 'danger',
														message:
															'No es un archivo PDF',
													})
												else {
													showToast({
														color: 'success',
														message:
															'El archivo PDF se ha cargado correctamente',
													})
												}
											}}
										/>
									</Form.Group>
								</Row>
							</div>
						</Row>

						<center>
							<Button
								className='m-3'
								type='submit'
								variant='success'
							>
								Publicar
							</Button>
							<Button onClick={x}>HOLA</Button>
						</center>
					</Modal.Body>
				</div>
			</Form>
		</Modal>
	)
}
export default SignupForm
