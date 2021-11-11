import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Form, Button, Row, InputGroup, Col } from 'react-bootstrap'
import swal from 'sweetalert'
import * as Yup from 'yup'
import { useToast } from '../context/providers/ToastContext'
import styles from './PostForm.module.scss'
import { app } from '../fb'
import { useValidateClassCode } from '../context/providers/ClassCodeContext'
import { useCompany } from '../context/providers/CompanyContext'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'
import { useLocation } from 'wouter'
import { userTypes } from '../context/reducers/userCredentialsReducer'

const CGregistrationForm = ({ company }) => {
	const { id, userType } = useUserCredentials()
	const { registerCompany, updateCompany } = useCompany()
	const [location] = useLocation()
	const additional =
		userType === userTypes.COMPANY && location === '/additional-info'
	const title =
		location !== '/additional-info'
			? 'Registro de Grupo-Empresa'
			: company && !company.address
			? 'Subir informacion adicional'
			: 'Informacion adicional'

	useEffect(async () => {
		if (additional && company) {
			formik.setValues({
				...registerInitial,
				email: company.email,
				shortname: company.shortname,
				largename: company.name,
				society: company.companyType,
				check: true,
				partner1: company.partners[0] || registerInitial.partner1,
				partner2: company.partners[1] || registerInitial.partner2,
				partner3: company.partners[2] || registerInitial.partner3,
				partner4: company.partners[3] || registerInitial.partner4,
				partner5: company.partners[4] || registerInitial.partner5,
				address: company.address,
				telephone: company.telephone,
			})
		}
	}, [company])

	const registerInitial = {
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
	}
	const formik = useFormik({
		initialValues: registerInitial,
		validationSchema: Yup.object({
			codRegister:
				!company &&
				Yup.string()
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
						'El nombre de socio solo admite letras mayusculas, ' +
							'minusculas y espacios'
					),
			}),
			partner2: Yup.string().when('check', {
				is: true,
				then: Yup.string()
					.required('Se requiere los nombres de al menos tres socios')
					.matches(
						/^[A-Za-z ]+$/,
						'El nombre de socio solo admite letras mayusculas, ' +
							'minusculas y espacios'
					),
			}),
			partner3: Yup.string().when('check', {
				is: true,
				then: Yup.string()
					.required('Se requiere los nombres de al menos tres socios')
					.matches(
						/^[A-Za-z ]+$/,
						'El nombre de socio solo admite letras mayusculas, ' +
							'minusculas y espacios'
					),
			}),
			partner4: Yup.string().when('check', {
				is: true,
				then: Yup.string().matches(
					/^[A-Za-z ]+$/,
					'El nombre de socio solo admite letras mayusculas, ' +
						'minusculas y espacios'
				),
			}),
			partner5: Yup.string().when('check', {
				is: true,
				then: Yup.string().matches(
					/^[A-Za-z ]+$/,
					'El nombre de socio solo admite letras mayusculas, ' +
						'minusculas y espacios'
				),
			}),
			telephone: Yup.string().when('check', {
				is: true,
				then: Yup.string()
					.required('Se requiere el teléfono de la GE')
					.min(7, 'El teléfono debe tener minimo 7 caracteres')
					.max(8, 'El teléfono debe tener maximo 8 caracteres')
					.matches(/^[0-9]+$/, 'El teléfono debe tener solo numeros'),
			}),
			address: Yup.string().when('check', {
				is: true,
				then: Yup.string()
					.required('Se requiere la dirección de la GE')
					.min(10, 'La dirección debe tener minimo 10 caracteres')
					.max(50, 'La dirección debe tener maximo 50 caracteres')
					.matches(
						/^[A-Za-z0-9./ ]+$/,
						'La dirección debe tener solo  letras mayúsculas, ' +
							'minúsculas, espacios, numeros simbolos (.) y (/)'
					),
			}),
			attachedfile: Yup.string().when('check', {
				is: true,
				then: Yup.string().required(
					'Es necesario subir un archivo para continuar'
				),
			}),
		}),
		onSubmit: (values) => {
			swal({
				text: ' ¿Seguro de lo que va a enviar?',
				buttons: ['Seguir editando', 'Sí'],
			}).then((answer) => {
				if (answer) {
					const dto = {
						email: values.email,
						shortName: values.shortname,
						name: values.largename,
						companyType: values.society,
					}
					const p4 =
						values.check && values.partner4 ? [values.partner4] : []
					const p5 =
						values.check && values.partner5 ? [values.partner5] : []
					const additionalDTO = {
						address: values.address,
						telephone: values.telephone,
						partners: [
							values.partner1,
							values.partner2,
							values.partner3,
							...p4,
							...p5,
						],
						logo: values.attachedfile,
					}
					if (!additional) {
						registerCompany({
							registrationCode: values.codRegister,
							companyDTO: !values.check
								? dto
								: {
										...dto,
										...additionalDTO,
								  },
						})
					} else {
						updateCompany({
							companyId: id,
							companyDTO: {
								...additionalDTO,
								email: values.email,
							},
						})
					}
					Object.keys(values).forEach(
						(key) =>
							(values[key] = key !== 'check' ? '' : values[key])
					)
				}
			})
		},
	})

	function codRegisterOnKeyDown(e) {
		if (!e.key.match('[A-Za-z-]')) {
			e.preventDefault()
		}
	}
	const [activeInputs, setActiveInputs] = useState(false)
	const { classCode, setCode } = useValidateClassCode()
	function update(e) {
		e.target.value = e.target.value.substring(0, 11)
		e.target.value = e.target.value.toLowerCase()
		formik.handleChange(e)

		if (e.target.value.length === 11) {
			setCode(e.target.value)
		}
	}
	useEffect(() => {
		if (classCode) {
			setActiveInputs(classCode.code.length === 11)
		} else {
			setActiveInputs(false)
		}
	}, [classCode])

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
		if (!e.target.files[0]) {
			showToast({
				color: 'danger',
				message: 'No se ha subido ningun archivo',
			})
		} else if (!e.target.files[0].type.match('^image/')) {
			showToast({
				color: 'danger',
				message: 'No es un archivo de imagen',
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
		<Form className='p-5' onSubmit={formik.handleSubmit} noValidate>
			<Row>
				<center className='mb-3'>
					<h2>{title}</h2>
				</center>

				{!company && (
					<Form.Group controlId='codRegister'>
						<Form.Label className='fs-4'>
							Cod. de Registro G.E
						</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								maxLength={11}
								onChange={update}
								onBlur={formik.handleBlur}
								onKeyDown={codRegisterOnKeyDown}
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
				)}

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
			{!company && (
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
			)}

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
										value={formik.values.partner3}
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
							{company && !company.address && (
								<div>
									<Form.Label className='mb-2 fs-4'>
										Logo
									</Form.Label>

									<Row
										className={`${styles['drag-area']} rounded bg-light text-dark p-1 m-1`}
									>
										<Form.Group controlId='LOGO'>
											<div className='d-flex flex-column align-items-center'>
												<center>
													<h4>
														Arrastra y suelta tu
														archivo
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
														styles[
															'file-upload-input'
														]
													}
													type='file'
													accept='image/*'
													onChange={validationLOGO}
													isInvalid={
														formik.touched
															.attachedfile &&
														formik.errors
															.attachedfile
													}
												/>
												<Form.Control.Feedback type='invalid'>
													{formik.errors.attachedfile}
												</Form.Control.Feedback>
											</InputGroup>
										</Form.Group>
									</Row>
								</div>
							)}
						</Col>
					</Row>
				) : null}
			</div>
			{(!additional || (company && !company.address)) && (
				<center>
					<Button
						disabled={
							(additional && company && company.address) ||
							(!additional && !activeInputs)
						}
						className='m-4'
						type='submit'
						variant='success'
					>
						REGISTRARSE
					</Button>
				</center>
			)}
		</Form>
	)
}

export default CGregistrationForm
