import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { FiTrash } from 'react-icons/fi'
import swal from 'sweetalert'
import * as Yup from 'yup'
import { useAllCompanies } from '../../context/providers/CompanyContext'
import { useProject } from '../../context/providers/ProjectContext'
import { useSpace } from '../../context/providers/SpaceContext'
import { useReview } from '../../context/providers/ReviewContext'
import { useUserCredentials } from '../../context/providers/UserCredentialsContext'
export default function ReviewForm({
	show,
	onHide,
	titleForm = 'Crear Revisión',
	buttonText = 'CREAR',
}) {
	const { projects, getAdviserProjects } = useProject()
	const { companies } = useAllCompanies()
	const { spaces, getProjectSpaces } = useSpace()
	const [projectSpaces, setProjectSpaces] = useState([spaces])
	const { createReview } = useReview()
	const { id } = useUserCredentials()
	useEffect(() => {
		getAdviserProjects()
	}, [])
	useEffect(() => {
		setProjectSpaces(spaces)
		formik.setFieldValue('selectedSpaces', [])
	}, [spaces])

	function handleChangeProject(e) {
		getProjectSpaces({ projectId: e.target.value })
		formik.handleChange(e)
	}
	function handleChangeSpace(e) {
		formik.setFieldValue('selectedSpaces', [
			...formik.values.selectedSpaces,
			...spaces.filter((space) => space.id === e.target.value),
		])
		setProjectSpaces(
			projectSpaces.filter((space) => space.id !== e.target.value)
		)
	}
	function handleRemoveSpace(removed) {
		formik.setFieldValue(
			'selectedSpaces',
			formik.values.selectedSpaces.filter((space) => space.id !== removed)
		)
		setProjectSpaces([
			...projectSpaces,
			...spaces.filter((space) => space.id === removed),
		])
	}
	const formik = useFormik({
		initialValues: {
			title: '',
			project: '',
			company: '',
			selectedSpaces: [],
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required('Campo obligatorio')
				.min(5, 'Este campo debe contener mínimo 5 caracteres')
				.max(40, 'Este campo debe contener máximo 40 caracteres'),
			project: Yup.number()
				.required('Debe seleccionar un proyecto')
				.positive('Debe seleccionar un proyecto'),
			company: Yup.number()
				.required('Debe seleccionar una GE')
				.positive('Debe seleccionar una GE'),
			selectedSpaces: Yup.array()
				.required('Debe seleccionar al menos un espacio')
				.min(1, 'Debe seleccionar al menos un espacio'),
		}),
		onSubmit: (values) => {
			swal({
				text: ' ¿Seguro de lo que va a enviar?',
				buttons: ['Seguir editando', 'Sí'],
			}).then((answer) => {
				if (answer) {
					createReview({
						reviewDTO: {
							title: values.title,
							spaces: values.selectedSpaces.map(
								(space) => space.id
							),
							createdById: id,
							companyId: values.company,
						},
					})
				}
			})
		},
	})
	return (
		<Modal show={show} onHide={onHide}>
			<Form onSubmit={formik.handleSubmit}>
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
									}
								})
							}
						>
							X
						</Button>
					</div>
					<Modal.Header>
						<h2>{titleForm}</h2>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId='title'>
							<Form.Label className='fs-4'>Título</Form.Label>
							<Form.Control
								className='mb-2 fluid="md"'
								placeholder='Escriba aqui un título para la revisión'
								onChange={formik.handleChange}
								isInvalid={
									formik.touched.title && formik.errors.title
								}
							/>
							<Form.Control.Feedback type='invalid'>
								{formik.touched.title && formik.errors.title}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId='project'>
							<Form.Label className='fs-4'>Projecto</Form.Label>
							<Form.Select
								className='mb-2'
								onChange={handleChangeProject}
								isInvalid={
									formik.touched.project &&
									formik.errors.project
								}
							>
								<option>Seleccione un proyecto</option>
								{projects.map((project, index) => {
									return (
										<option
											key={project.id}
											value={project.id}
										>
											{project.title}
										</option>
									)
								})}
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								{formik.errors.project}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId='company'>
							<Form.Label className='fs-4'>
								Grupo-Empresa
							</Form.Label>
							<Form.Select
								className='mb-2'
								onChange={formik.handleChange}
								isInvalid={
									formik.touched.company &&
									formik.errors.company
								}
							>
								<option>Seleccione una GE</option>
								{companies.map((company, index) => {
									return (
										<option
											key={company.id}
											value={company.id}
										>
											{company.name}
										</option>
									)
								})}
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								{formik.errors.company}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId='spaces'>
							<Form.Label className='fs-4'>Espacios</Form.Label>
							<Form.Select
								className='mb-2'
								onChange={handleChangeSpace}
							>
								<option>
									Seleccione los espacios en revisión
								</option>
								{projectSpaces.map((space) => (
									<option key={space.id} value={space.id}>
										{space.title}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								{formik.errors.selectedSpaces}
							</Form.Control.Feedback>
						</Form.Group>
						<Row className='m-1'>
							{formik.values.selectedSpaces.map(
								(space, index) => (
									<Col
										sm={4}
										key={(formik.values.project, space.id)}
									>
										<Card className='shadow  bg-body rounded'>
											<Card.Body>
												<p>{space.title}</p>
												<Button
													variant='dark'
													className='rounded-circle'
													onClick={() =>
														handleRemoveSpace(
															space.id
														)
													}
												>
													<FiTrash />
												</Button>
											</Card.Body>
										</Card>
									</Col>
								)
							)}
						</Row>
					</Modal.Body>
					<center>
						<Button className='m-3' type='submit' variant='success'>
							{buttonText}
						</Button>
					</center>
				</div>
			</Form>
		</Modal>
	)
}
