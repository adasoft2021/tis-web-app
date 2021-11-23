import { useField } from 'formik'
import { Form } from 'react-bootstrap'
import { useAllAdviserPublications } from '../../../context/providers/PublicationContext'
import { useCurrentSemester } from '../../../context/providers/SemesterContext'

export default function FormSelect({
	label,
	name,
	publicationType,
	placeholder,
}) {
	const {
		semester: { semester: currentSemester },
	} = useCurrentSemester()
	const { isLoading, publications } =
		useAllAdviserPublications(publicationType)

	const [field, meta] = useField({ name })

	return (
		<Form.Group className='mt-4' controlId={name}>
			<Form.Label className='text-light'>{label}</Form.Label>
			<Form.Select {...field} isInvalid={!!meta.touched && !!meta.error}>
				<option value='' disabled>
					{placeholder}
				</option>
				{!isLoading &&
					currentSemester &&
					publications
						.filter(({ semester }) => semester === currentSemester)
						.map(({ id, title }) => (
							<option key={id} value={id}>
								{title}
							</option>
						))}
			</Form.Select>
			<Form.Control.Feedback type='invalid'>
				{meta.error}
			</Form.Control.Feedback>
		</Form.Group>
	)
}
