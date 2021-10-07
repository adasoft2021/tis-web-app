import { useField } from 'formik'
import { Col, Form, Row } from 'react-bootstrap'

export default function Qualification({ label, points, ...props }) {
	const [field, meta] = useField(props)

	return (
		<>
			<Form.Group
				as={Row}
				className='mb-3'
				controlId={`form-${props.name}`}
			>
				<Form.Label column sm='8' className='text-light'>
					{label}
					{meta.error && (
						<div>
							<small className='text-danger'>{meta.error}</small>
						</div>
					)}
				</Form.Label>
				<Col sm='2'>
					<Form.Control
						type='number'
						isInvalid={!!(meta.touched && meta.error)}
						{...field}
						{...props}
					/>
				</Col>
				<Col sm='2'>
					<p className='text-light'>{points}</p>
				</Col>
			</Form.Group>
		</>
	)
}
