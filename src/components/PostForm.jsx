import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Modal, Row, Button, Form, InputGroup } from 'react-bootstrap'
import styles from './PostForm.module.scss'
import { useToast } from '../context/providers/ToastContext'
import * as Yup from 'yup'
import swal from 'sweetalert'
import { app } from '../fb'

const getToDay = () => {
	const ToDay = new Date()
	const now = `${ToDay.getUTCFullYear()}-${
		ToDay.getUTCMonth() + 1
	}-${ToDay.getUTCDate()}`
	return now
}
const PostForm = ({
	show,
	onHide,
	header,
	buttonForm,
	withDTO,
	semester,
	dto,
}) => {
	const formik = useFormik({
		initialValues: {
			title: dto ? dto.title : '',
			date: dto ? dto.date.slice(0, 10) : '',
			code: dto ? dto.code : '',
			semester: semester,
			attachedfile: dto ? dto.fileUrl : '',
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
			semester: Yup.string().matches(
				/^[12]{1}[-][0-9]{4}$/,
				'Por favor siga el siguiente formato Ej: (1-2021)'
			),
			attachedfile: Yup.string().required(
				'Es necesario subir un archivo para continuar'
			),
		}),

		onSubmit: (values) => {
			if (withDTO) {
				withDTO({
					publicationDTO: {
						title: values.title,
						date: values.date + 'T00:00:00.000Z',
						code: values.code,
						semester: values.semester,
						fileUrl: values.attachedfile,
					},
				})
			}
		},
	})
	const { showToast } = useToast()
	const [fileUrl, setFileUrl] = useState('')
	useEffect(() => {
		if (fileUrl !== '') {
			formik.setValues({ ...formik.values, attachedfile: fileUrl })
			showToast({
				color: 'success',
				message: 'El archivo se ha cargando correctamente',
			})
		}
	}, [fileUrl, setFileUrl])

	const uploadFile = async (e) => {
		const file = e.target.files[0]
		const storageRef = app.storage().ref()
		const filePath = storageRef.child(file.name)
		try {
			await filePath.put(file)
			const fileDownloadUrl = await filePath.getDownloadURL()
			setFileUrl(fileDownloadUrl)
		} catch {
			showToast({
				color: 'danger',
				message: 'No se pudo subir el archivo',
			})
		}
	}
	const validationPDF = async (e) => {
		if (!e.target.files[0]) {
			showToast({
				color: 'danger',
				message: 'No se ha subido ningun archivo',
			})
		} else if (e.target.files[0].type !== 'application/pdf') {
			showToast({
				color: 'danger',
				message: 'No es un archivo PDF',
			})
		} else {
			showToast({
				color: 'info',
				message: 'El archivo PDF se esta cargando...',
			})
			uploadFile(e)
		}
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
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
								swal({
									text: ' ¿Seguro que quiere salir? Se borrará los datos ingresados.',
									icon: 'warning',
									buttons: ['Seguir editando', 'Si'],
								}).then((answer) => {
									if (answer) {
										onHide()
										formik.handleReset()
									}
								})
							}
						>
							X
						</Button>
					</div>
					<Modal.Body className='text-light'>
						<Row>
							<center className='mb-3'>
								<h2>{header}</h2>
							</center>
							<Form.Group controlId='title'>
								<Form.Label className='fs-4'>Título</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										className='mb-2'
										onChange={formik.handleChange}
										value={formik.values.title}
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
							<Form.Group controlId='code'>
								<Form.Label className='fs-4'>Código</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										className='mb-2 fluid="md"'
										onChange={formik.handleChange}
										value={formik.values.code}
										isInvalid={
											formik.touched.code &&
											formik.errors.code
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.code}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId='semester'>
								<Form.Label className='fs-4'>
									Semestre
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										className='mb-2'
										type='text'
										value={formik.values.semester}
										disabled={true}
										title={
											'Este campo es llenado por defecto ' +
											(!dto
												? 'para el semestre actual'
												: 'con el semestre de la convocatoria')
										}
										isInvalid={formik.errors.semester}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.semester}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<div className='mt-3 mb-3'>
								<Form.Label className='mb-2 fs-4'>
									Archivo adjunto
								</Form.Label>
								<Row
									className={`${styles['drag-area']} rounded bg-light text-dark p-4`}
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
										<InputGroup
											className={
												styles['file-upload-input']
											}
											hasValidation
										>
											<Form.Control
												type='file'
												accept='application/pdf'
												onChange={validationPDF}
												isInvalid={
													formik.touched
														.attachedfile &&
													formik.errors.attachedfile
												}
											/>
											<Form.Control.Feedback type='invalid'>
												{formik.errors.attachedfile}
											</Form.Control.Feedback>
										</InputGroup>
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
								{buttonForm}
							</Button>
						</center>
					</Modal.Body>
				</div>
			</Form>
		</Modal>
	)
}
export default PostForm
