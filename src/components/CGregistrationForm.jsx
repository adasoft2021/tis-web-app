import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Form, Button, Row, InputGroup, Col } from 'react-bootstrap'
import swal from 'sweetalert'
import * as Yup from 'yup'
import { useToast } from '../context/providers/ToastContext'
import styles from './PostForm.module.scss'
import { app } from '../fb'

// import AddInformationForm from './AddInformationForm'

const CGregistrationForm = ({ show, onHide }) => {
	const formik = useFormik({
		initialValues: {
			codRegister: '',
			email: '',
			shortname: '',
			largename: '',
			society: '',
			check: '',
			partner1: '',
			partner2: '',
			partner3: '',
			partner4: '',
			partner5: '',
			address: '',
			telephone: '',
			attachedfile: '',
		},
		validationSchema: Yup.object({
			codRegister: Yup.string()
				.required('Campo obligatorio')
				.min(11, 'Este campo debe contener mínimo 11 caracteres.')
				.max(11, 'Este campo debe contener maximo 11 caracteres.')
				.matches(
					/^[a-z]{3}[-][a-z]{3}[-][a-z]{3}$/,
					'Introduzca un código de registro correcto. Ej: asd-fgh-jkl'
				),
			email: Yup.string()
				.required('Campo obligatorio')
				.min(15, 'Este campo debe contener mínimo 10 caracteres.')
				.max(40, 'Este campo debe contener maximo 40 caracteres.')
				.email('Introdusca unn correo electronico valido'),
			shortname: Yup.string()
				.required('Campo obligatorio')
				.min(3, 'Este campo debe contener mínimo 10 caracteres.')
				.max(20, 'Este campo debe contener maximo 40 caracteres.')
				.matches(
					/^[A-Za-z.& ]+$/,
					'Este campo solo admite letras, espacios, (.) y (&)'
				),
			largename: Yup.string()
				.required('Campo obligatorio')
				.min(10, 'Este campo debe contener mínimo 10 caracteres.')
				.max(70, 'Este campo debe contener maximo 40 caracteres.')
				.matches(
					/^[A-Za-z.& ]+$/,
					'Este campo solo admite letras, espacios, (.) y (&)'
				),
			society: Yup.string().required('Campo obligatorio'),

			check: Yup.boolean(),

			partner1: Yup.string().when('check', {
				is: true,
				then: Yup.string()
					.required('Se requiere los nombres de al menos tres socios')
					.matches(
						/^[A-Za-z ]+$/,
						'El nombre de socio solo admite letras mayusculas, minusculas y espacios'
					),
			}),
			partner2: Yup.string().when('check', {
				is: true,
				then: Yup.string()
					.required('Se requiere los nombres de al menos tres socios')
					.matches(
						/^[A-Za-z ]+$/,
						'El nombre de socio solo admite letras mayusculas, minusculas y espacios'
					),
			}),
			partner3: Yup.string().when('check', {
				is: true,
				then: Yup.string()
					.required('Se requiere los nombres de al menos tres socios')
					.matches(
						/^[A-Za-z ]+$/,
						'El nombre de socio solo admite letras mayusculas, minusculas y espacios'
					),
			}),
			partner4: Yup.string().when('check', {
				is: true,
				then: Yup.string().matches(
					/^[A-Za-z ]+$/,
					'El nombre de socio solo admite letras mayusculas, minusculas y espacios'
				),
			}),
			partner5: Yup.string().when('check', {
				is: true,
				then: Yup.string().matches(
					/^[A-Za-z ]+$/,
					'El nombre de socio solo admite letras mayusculas, minusculas y espacios'
				),
			}),
			telephone: Yup.string()
				.required('Se requiere el teléfono de la GE')
				.min(7, 'El teléfono debe tener minimo 7 caracteres')
				.max(8, 'El teléfono debe tener maximo 8 caracteres')
				.matches(/^[0-9]+$/, 'El teléfono debe tener solo numeros'),
			address: Yup.string()
				.required('Se requiere la dirección de la GE')
				.min(10, 'La dirección debe tener minimo 10 caracteres')
				.max(50, 'La dirección debe tener maximo 50 caracteres')
				.matches(
					/^[A-Za-z0-9./ ]+$/,
					'La dirección debe tener solo  letras mayúsculas, minúsculas, espacios, numeros simbolos (.) y (/)'
				),
			attachedfile: Yup.string().required(
				'Es necesario subir un archivo para continuar'
			),
		}),
		onSubmit: (values) => {
			swal({
				text: ' ¿Seguro que quiere salir? Se borrará los datos ingresados.',
				buttons: ['Cancelar', 'Confirmar'],
			}).then((answer) => {
				if (answer) {
					alert(JSON.stringify(values, null, 2))
				}
			})
		},
	})

	const [activeInputs, setActiveInputs] = useState(false)

	function update(e) {
		formik.handleChange(e)
		if (e.target.value) {
			setActiveInputs(true)
		} else {
			setActiveInputs(false)
		}
	}
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
	const validationLOGO = async (e) => {
		console.log(e.target.files[0].type)
		if (!e.target.files[0]) {
			showToast({
				color: 'danger',
				message: 'No se ha subido ningun archivo',
			})
		} else if (e.target.files[0].type !== 'image/jpeg') {
			showToast({
				color: 'danger',
				message: 'No es un archivo Imagen formato jpg',
			})
		} else {
			showToast({
				color: 'info',
				message: 'El logo se esta cargando...',
			})
			uploadFile(e)
		}
	}
	return (
		<Form className='p-5' onSubmit={formik.handleSubmit}>
			<Row>
				<center className='mb-3'>
					<h2>Registro de Grupo-Empresa</h2>
				</center>

				<Form.Group controlId='codRegister'>
					<Form.Label className='fs-4'>
						Cod. de Registro G.E
					</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
							onChange={update}
							value={formik.values.codRegister}
							isInvalid={
								formik.touched.codRegister &&
								formik.errors.codRegister
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.codRegister}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label className='fs-4'>E-mail</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							onChange={formik.handleChange}
							value={formik.values.email}
							isInvalid={
								formik.touched.email && formik.errors.email
							}
							disabled={!activeInputs}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.email}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='shortname'>
					<Form.Label className='fs-4'>Nombre corto</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							onChange={formik.handleChange}
							value={formik.values.shortname}
							isInvalid={
								formik.touched.shortname &&
								formik.errors.shortname
							}
							disabled={!activeInputs}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.shortname}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='largename'>
					<Form.Label className='fs-4'>Nombre largo</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							onChange={formik.handleChange}
							value={formik.values.largename}
							isInvalid={
								formik.touched.largename &&
								formik.errors.largename
							}
							disabled={!activeInputs}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.largename}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group controlId='society'>
					<Form.Label className='fs-4'>Tipo de Sociedad</Form.Label>
					<InputGroup hasValidation>
						<Form.Select
							onChange={formik.handleChange}
							value={formik.values.society}
							isInvalid={
								formik.touched.society && formik.errors.society
							}
							disabled={!activeInputs}
						>
							<option></option>
							<option>SRL</option>
							<option>SA</option>
							<option>SC</option>
							<option>RL</option>
						</Form.Select>

						<Form.Control.Feedback type='invalid'>
							{formik.errors.society}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
			</Row>
			<Form.Group className='pt-3' controlId='check'>
				<InputGroup hasValidation>
					<Form.Check
						disabled={!activeInputs}
						type='checkbox'
						value={formik.values.check}
						label={'Subir informacion adicional'}
						onChange={formik.handleChange}
					/>

					<Form.Control.Feedback type='invalid'>
						{formik.errors.check}
					</Form.Control.Feedback>
				</InputGroup>
			</Form.Group>

			<div>
				{formik.values.check ? (
					<Row>
						<Col sm={6}>
							<Form.Group controlId='partner1'>
								<Form.Label className='fs-4'>
									Socio 1
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										onChange={formik.handleChange}
										value={formik.values.partner1}
										isInvalid={
											formik.touched.partner1 &&
											formik.errors.partner1
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.partner1}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId='partner2'>
								<Form.Label className='fs-4'>
									Socio 2
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										onChange={formik.handleChange}
										value={formik.values.partner2}
										isInvalid={
											formik.touched.partner2 &&
											formik.errors.partner2
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.partner2}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId='partner3'>
								<Form.Label className='fs-4'>
									Socio 3
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										onChange={formik.handleChange}
										value={formik.values.socio3}
										isInvalid={
											formik.touched.partner3 &&
											formik.errors.partner3
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.partner3}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId='partner4'>
								<Form.Label className='fs-4'>
									Socio 4
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										onChange={formik.handleChange}
										value={formik.values.partner4}
										isInvalid={
											formik.touched.partner4 &&
											formik.errors.partner4
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.partner4}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId='partner5'>
								<Form.Label className='fs-4'>
									Socio 5
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										onChange={formik.handleChange}
										value={formik.values.partner5}
										isInvalid={
											formik.touched.partner5 &&
											formik.errors.partner5
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.partner5}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form.Group controlId='address'>
								<Form.Label className='fs-4'>
									Dirección
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										maxLength={11}
										onChange={formik.handleChange}
										value={formik.values.address}
										isInvalid={
											formik.touched.address &&
											formik.errors.address
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.address}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId='telephone'>
								<Form.Label className='fs-4'>
									Teléfono
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										maxLength={11}
										onChange={formik.handleChange}
										value={formik.values.telephone}
										isInvalid={
											formik.touched.telephone &&
											formik.errors.telephone
										}
									/>
									<Form.Control.Feedback type='invalid'>
										{formik.errors.telephone}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Label className='mb-2 fs-4'>Logo</Form.Label>
							<Row
								className={`${styles['drag-area']} rounded bg-light text-dark p-1 m-1`}
							>
								<Form.Group controlId='LOGO'>
									<div className='d-flex flex-column align-items-center'>
										<center>
											<h4>
												Arrastra y suelta tu archivo
											</h4>
										</center>
										<h4>o</h4>
										<Form.Label className='btn btn-primary'>
											Selecciona tu archivo
										</Form.Label>
									</div>
									<InputGroup hasValidation>
										<Form.Control
											className={
												styles['file-upload-input']
											}
											type='file'
											accept='image/*'
											onChange={validationLOGO}
											isInvalid={
												formik.touched.attachedfile &&
												formik.errors.attachedfile
											}
										/>
										<Form.Control.Feedback type='invalid'>
											{formik.errors.attachedfile}
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Row>
						</Col>
					</Row>
				) : null}
			</div>
			<center>
				<Button
					disabled={!activeInputs}
					className='m-4'
					type='submit'
					variant='success'
				>
					REGISTRARSE
				</Button>
			</center>
		</Form>
	)
}

export default CGregistrationForm
