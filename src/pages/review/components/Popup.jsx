import { Form, Modal, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import Qualification from './Qualification'
import { useReview } from '../../../context/providers/ReviewContext'

export default function Popup(props) {
	const {
		review,
		isLoading,
		updateReview,
		qualifications: { qualificationIntialState, qualificationSchema },
	} = useReview()

	const getTotalScore = (scores) => {
		let totalScore = 0
		scores = scores.forEach((score) => {
			let intScore = parseInt(score)
			intScore = Number.isInteger(intScore) ? intScore : 0
			totalScore += intScore
		})
		return totalScore > 100 ? 0 : totalScore
	}

	if ((isLoading && !review) || !review) {
		return null
	}
	if (review.qualifications.length === 0) {
		return null
	}
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Formik
				initialValues={{
					...qualificationIntialState,
					comentario: review.comment ? review.comment : '',
				}}
				onSubmit={async ({ comentario, ...rest }, { resetForm }) => {
					const reviewDTO = {
						comment: comentario || null,
						qualifications: Object.keys(rest).map((field) => ({
							score: rest[field] || null,
							qualificationId: field.split('-')[1],
						})),
					}
					await updateReview({ reviewId: review.id, reviewDTO })
					props.onHide()
				}}
				validationSchema={qualificationSchema}
			>
				{({
					values: { comentario, ...rest },
					handleChange,
					touched,
					errors,
					handleSubmit,
					isValid,
					dirty,
				}) => (
					<Form onSubmit={handleSubmit} className='bg-dark'>
						<div
							className='bg-dark'
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
								{review.qualifications.map(
									({ id, description, maxScore }) => (
										<Qualification
											key={id}
											label={description}
											points={maxScore}
											name={`field-${id}`}
											onChange={handleChange}
											disabled={
												review.status === 'Calificada'
											}
										/>
									)
								)}
								<Form.Group as={Row} className='mb-3'>
									<Form.Label
										column
										sm='8'
										className='text-light'
									>
										<h3>TOTAL</h3>
									</Form.Label>
									<Col sm='2' className='text-light'>
										<p className='bg-light text-dark p-1 rounded text-center h5'>
											{getTotalScore(Object.values(rest))}
										</p>
									</Col>
									<Col sm='2'>
										<p className='text-light'>
											{'/'}
											{getTotalScore(
												review.qualifications.map(
													({ maxScore }) => maxScore
												)
											)}
										</p>
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
									disabled={review.status === 'Calificada'}
								></textarea>
								{touched.comentario && errors.comentario && (
									<div className='error text-danger'>
										{errors.comentario}
									</div>
								)}
								<div className='Container'></div>
								{!review.published && (
									<center>
										<Button
											type='submit'
											variant='success'
											style={{ margin: 10 }}
											disabled={!(isValid && dirty)}
										>
											GUARDAR
										</Button>
									</center>
								)}
							</Modal.Body>
							<Modal.Footer className='bg-dark'></Modal.Footer>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}
