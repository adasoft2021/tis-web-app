import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import { useToast } from '../context/providers/ToastContext'
import styles from './PostForm.module.scss'
import { app } from '../fb'

const AddInformationForm = () => {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			partner1: '',
			partner2: '',
			partner3: '',
			partner4: '',
			partner5: '',
			address: '',
			telephone: '',
			attachedfile: '',
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2))
			console.log(formik)
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
	const validationLOGO = async (e) => {
		if (!e.target.files[0]) {
			showToast({
				color: 'danger',
				message: 'No se ha subido ningun archivo',
			})
		} else if (e.target.files[0].type.match('image/*')) {
			showToast({
				color: 'danger',
				message: 'No es una imagen',
			})
		} else {
			showToast({
				color: 'info',
				message: 'El archivo imagen se esta cargando...',
			})
			uploadFile(e)
		}
	}

	return (
		<Row>
			<Col sm={6}>
				<Form.Group controlId='partner1'>
					<Form.Label className='fs-4'>Socio 1</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
							value={formik.values.socio1}
							isInvalid={
								formik.touched.partner1 &&
								formik.errors.partner1
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.socio1}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='partner2'>
					<Form.Label className='fs-4'>Socio 2</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
							value={formik.values.partner2}
							isInvalid={
								formik.touched.partner2 &&
								formik.errors.partner2
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.socio2}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='partner3'>
					<Form.Label className='fs-4'>Socio 3</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
							value={formik.values.socio3}
							isInvalid={
								formik.touched.partner3 &&
								formik.errors.partner3
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.socio3}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='partner4'>
					<Form.Label className='fs-4'>Socio 4</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
							value={formik.values.socio4}
							isInvalid={
								formik.touched.partner4 &&
								formik.errors.partner4
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.socio4}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='partner5'>
					<Form.Label className='fs-4'>Socio 5</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
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
					<Form.Label className='fs-4'>Direccion</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
							value={formik.values.address}
							isInvalid={
								formik.touched.address && formik.errors.address
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.addres}
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId='socio2'>
					<Form.Label className='fs-4'>Telefono</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							maxLength={11}
							value={formik.values.socio2}
							isInvalid={
								formik.touched.socio2 && formik.errors.socio2
							}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.socio2}
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
								<h4>Arrastra y suelta tu archivo</h4>
							</center>
							<h4>o</h4>
							<Form.Label className='btn btn-primary'>
								Selecciona tu archivo
							</Form.Label>
						</div>
						<InputGroup hasValidation>
							<Form.Control
								className={styles['file-upload-input']}
								type='file'
								accept='imagen/*'
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
	)
}
export default AddInformationForm
