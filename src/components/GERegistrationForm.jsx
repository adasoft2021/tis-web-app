import React from 'react'
import { useFormik } from 'formik'
import { Modal, Form, Button, Row, InputGroup } from 'react-bootstrap'
import swal from 'sweetalert'
import * as Yup from 'yup'

const InformationGE = ({ show, onHide }) => {
	const formik = useFormik({
		initialValues: {
			codRegister: '',
			email: '',
			shortname: '',
			largename: '',
			society: '',
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
		}),
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2))
			console.log(InformationGE)
		},
	})
	return (
		<Modal
			show={show}
			onHide={onHide}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			backdrop='static'
			keyboard={false}
		>
			<Modal.Body className=' bg-dark text-light '>
				<Form className='p-5' onSubmit={formik.handleSubmit}>
					<div className='mb-4'>
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
					</div>
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
									onChange={formik.handleChange}
									value={formik.values.codRegister}
									isInvalid={
										formik.touched.codRegister &&
										formik.errors.codRegister
									}
									onkeydown='if(this.value.length==4) return false;'
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
										formik.touched.email &&
										formik.errors.email
									}
								/>
								<Form.Control.Feedback type='invalid'>
									{formik.errors.email}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>

						<Form.Group controlId='shortname'>
							<Form.Label className='fs-4'>
								Nombre corto
							</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
									onChange={formik.handleChange}
									value={formik.values.shortname}
									isInvalid={
										formik.touched.shortname &&
										formik.errors.shortname
									}
								/>
								<Form.Control.Feedback type='invalid'>
									{formik.errors.shortname}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>

						<Form.Group controlId='largename'>
							<Form.Label className='fs-4'>
								Nombre largo
							</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
									onChange={formik.handleChange}
									value={formik.values.largename}
									isInvalid={
										formik.touched.largename &&
										formik.errors.largename
									}
								/>
								<Form.Control.Feedback type='invalid'>
									{formik.errors.largename}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group controlId='society'>
							<Form.Label className='fs-4'>
								Tipo de Sociedad
							</Form.Label>
							<InputGroup hasValidation>
								<Form.Select
									onChange={formik.handleChange}
									value={formik.values.society}
									isInvalid={
										formik.touched.society &&
										formik.errors.society
									}
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
					<center>
						<Button className='m-4' type='submit' variant='success'>
							REGISTRARSE
						</Button>
					</center>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default InformationGE
