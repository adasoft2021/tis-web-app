import { Form, Modal, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import Qualification from './Qualification'
import { useReview } from '../../../context/providers/ReviewContext'

const fields = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']

export default function Popup(props) {
	const { review, isLoading, updateReview, qualificationSchema } = useReview()

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
					one: review.qualifications[0].score || '',
					two: review.qualifications[1].score || '',
					three: review.qualifications[2].score || '',
					four: review.qualifications[3].score || '',
					five: review.qualifications[4].score || '',
					six: review.qualifications[5].score || '',
					seven: review.qualifications[6].score || '',
					comentario: review.comment || '',
				}}
				onSubmit={async ({ comentario, ...rest }) => {
					const reviewDTO = {
						comment: comentario || null,
						qualifications: [
							{
								score: rest.one === '' ? null : rest.one,
								qualificationId: review.qualifications[0].id,
							},
							{
								score: rest.two === '' ? null : rest.two,
								qualificationId: review.qualifications[1].id,
							},
							{
								score: rest.three === '' ? null : rest.three,
								qualificationId: review.qualifications[2].id,
							},
							{
								score: rest.four === '' ? null : rest.four,
								qualificationId: review.qualifications[3].id,
							},
							{
								score: rest.five === '' ? null : rest.five,
								qualificationId: review.qualifications[4].id,
							},
							{
								score: rest.six === '' ? null : rest.six,
								qualificationId: review.qualifications[5].id,
							},
							{
								score: rest.seven === '' ? null : rest.seven,
								qualificationId: review.qualifications[6].id,
							},
						],
					}
					await updateReview({ reviewId: 1, reviewDTO })
				}}
				validationSchema={qualificationSchema}
			>
				{({
					values: {
						comentario,
						one,
						two,
						three,
						four,
						five,
						six,
						seven,
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
								{review.qualifications.map(
									({ id, description, maxScore }, index) => (
										<Qualification
											key={id}
											label={description}
											points={maxScore}
											name={fields[index]}
											disabled={review.totalScore}
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
											{getTotalScore([
												one,
												two,
												three,
												four,
												five,
												six,
												seven,
											])}
										</p>
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
									disabled={review.totalScore}
								></textarea>
								{touched.comentario && errors.comentario && (
									<div className='error text-danger'>
										{errors.comentario}
									</div>
								)}
								<div className='Container'></div>
								{!review.totalScore && (
									<center>
										<Button
											type='submit'
											variant='success'
											style={{ margin: 10 }}
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
