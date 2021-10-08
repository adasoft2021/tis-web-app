import { Form, Modal, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import Qualification from './Qualification'
import * as yup from 'yup'

const descriptions = [
	{
		id: 1,
		description: 'Cumplimiento de especicaciones del proponente',
		points: '/15 puntos',
		max: 15,
		name: 'one',
	},
	{
		id: 2,
		description: 'Claridad en la organizacion de la empresa proponente',
		points: '/10 puntos',
		max: 10,
		name: 'two',
	},
	{
		id: 3,
		description: 'Cumplimiento de especicaciones tecnicas',
		points: '/30 puntos',
		max: 30,
		name: 'three',
	},
	{
		id: 4,
		description: 'Claridad en el proceso de desarrollo',
		points: '/10 puntos',
		max: 10,
		name: 'four',
	},
	{
		id: 5,
		description: 'Plazo de ejecucion',
		points: '/10 puntos',
		max: 10,
		name: 'five',
	},
	{
		id: 6,
		description: 'Precio total',
		points: '/15 puntos',
		max: 15,
		name: 'six',
	},
	{
		id: 7,
		description: 'Uso de herramientas en el proceso de desarrollo',
		points: '/10 puntos',
		max: 10,
		name: 'seven',
	},
]

const schema = yup.object({
	one: yup
		.number('El valor tiene que ser numerico')
		.min(0, 'Este campo no pude ser menor a 0')
		.max(15, 'Este campo no puede ser mayor a 15'),
	two: yup
		.number()
		.min(0, 'Este campo no pude ser menor a 0')
		.max(15, 'Este campo no puede ser mayor a 15'),
	three: yup
		.number()
		.min(0, 'Este campo no pude ser menor a 0')
		.max(15, 'Este campo no puede ser mayor a 15'),
	four: yup
		.number()
		.min(0, 'Este campo no pude ser menor a 0')
		.max(15, 'Este campo no puede ser mayor a 15'),
	five: yup
		.number()
		.min(0, 'Este campo no pude ser menor a 0')
		.max(15, 'Este campo no puede ser mayor a 15'),
	six: yup
		.number()
		.min(0, 'Este campo no pude ser menor a 0')
		.max(15, 'Este campo no puede ser mayor a 15'),
	seven: yup
		.number()
		.min(0, 'Este campo no pude ser menor a 0')
		.max(15, 'Este campo no puede ser mayor a 15'),
	comentario: yup
		.string()
		.max(
			25,
			'El comentario no puede sobrepasar la cantidad de 200 caracteres'
		),
})

function Popup(props) {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Formik
				initialValues={{
					one: '',
					two: '',
					three: '',
					four: '',
					five: '',
					six: '',
					seven: '',
					total: '',
					comentario: '',
					namebutton: 'GUARDAR',
					statebutton: true,
				}}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2))

						actions.setSubmitting(false)
					}, 1000)
					values.namebutton = 'CALIFICADO'
					values.statebutton = false
					alert(
						'LOS CAMBIOS FUERON GUARDADOS Y LOS CAMPOS DESABILITADOS'
					)
				}}
				validationSchema={schema}
			>
				{({
					values: {
						namebutton,
						comentario,
						total,
						one,
						two,
						three,
						four,
						five,
						six,
						seven,
						statebutton,
					},
					handleChange,
					touched,
					errors,
					handleSubmit,
				}) => (
					<Form onSubmit={handleSubmit} className='bg-dark'>
						<div
							className='bg-'
							style={{ margin: 50, background: 'black' }}
						>
							<Modal.Header closeButton className='bg-dark'>
								<Modal.Title
									className='text-center text-light'
									id='contained-modal-title-center'
								></Modal.Title>
							</Modal.Header>

							<Modal.Body className='bg-dark'>
								<div>
									<center className='bg-dark text-light'>
										<h1>Revision G.E. </h1>
									</center>
								</div>
								<hr />
								{descriptions.map((qualification) => (
									<Qualification
										key={qualification.id}
										label={qualification.description}
										points={qualification.points}
										name={qualification.name}
										disabled={!statebutton}
									/>
								))}
								<Form.Group as={Row} className='mb-3'>
									<Form.Label
										column
										sm='8'
										className='text-light'
									>
										<h3>TOTAL</h3>
									</Form.Label>
									<Col sm='2' className='text-light'>
										<Form.Control
											name='total'
											value={
												parseInt(one, 10) +
												parseInt(two, 10) +
												parseInt(three, 10) +
												parseInt(four, 10) +
												parseInt(five, 10) +
												parseInt(six, 10) +
												parseInt(seven, 10)
											}
										/>
									</Col>
									<Col sm='2'>
										<p className='text-light'>/100</p>
									</Col>
								</Form.Group>
								<h4 className='text-light'>Comentario</h4>
								<textarea
									className='form-control'
									id='Textarea1'
									rows='3'
									name='comentario'
									value={comentario}
									onChange={handleChange}
									disabled={!statebutton}
								></textarea>
								{touched.comentario && errors.comentario && (
									<div className='error text-danger'>
										{errors.comentario}
									</div>
								)}
								<div className='Container'></div>
								<center>
									<Button
										type='submit'
										variant='success'
										style={{ margin: 10 }}
										disabled={!statebutton}
									>
										{namebutton}
									</Button>
								</center>
							</Modal.Body>
							<Modal.Footer className='bg-dark'></Modal.Footer>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}

export default Popup
