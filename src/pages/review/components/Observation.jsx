import { Button, Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsCheckCircle } from 'react-icons/bs'
import { useObservation } from '../../../context/providers/ObservationContext'
import { useReview } from '../../../context/providers/ReviewContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect } from 'react'

const schema = yup.object({
	title: yup.string().required('Requerido').min(4, 'Mínimo 4 caracteres'),
	description: yup
		.string()
		.required('Requerido')
		.min(10, 'Mínimo 10 caracteres'),
})

export default function Observation({
	id = null,
	description = null,
	title = null,
}) {
	const {
		createObservation,
		deleteObservation,
		errorCreate,
		errorDelete,
		errorUpdate,
		updateObservation,
	} = useObservation()

	useEffect(() => {
		if (errorCreate) {
			alert(errorCreate)
		}
	}, [errorCreate])

	useEffect(() => {
		if (errorUpdate) {
			alert(errorUpdate)
		}
	}, [errorUpdate])

	useEffect(() => {
		if (errorDelete) {
			alert(errorDelete)
		}
	}, [errorDelete])
	const { review } = useReview()

	const formik = useFormik({
		initialValues: {
			title: title || '',
			description: description || '',
		},
		validationSchema: schema,
		onSubmit: async ({ description, title }) => {
			if (id) {
				await updateObservation({
					observationId: id,
					observationDTO: { description, title },
				})
				return
			}
			await createObservation({
				reviewId: review.id,
				observationDTO: { description, title },
			})

			formik.setValues({
				description: '',
				title: '',
			})

			formik.setErrors({})
			formik.setTouched({ title: false, description: false })
		},
	})

	return (
		<Form
			onSubmit={formik.handleSubmit}
			className='p-3 rounded d-flex gap-4 w-100 bg-dark'
		>
			<div className='flex-fill'>
				<Form.Group>
					<Form.Control
						name='title'
						placeholder='Observación'
						onChange={formik.handleChange}
						value={formik.values.title}
						isInvalid={formik.errors.title && formik.touched.title}
					/>
					<Form.Control.Feedback type='invalid'>
						{formik.errors.title}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group>
					<Form.Control
						name='description'
						placeholder='Descripción'
						as='textarea'
						rows={3}
						className='w-100 mt-2'
						onChange={formik.handleChange}
						value={formik.values.description}
						isInvalid={
							formik.errors.description &&
							formik.touched.description
						}
					/>
					<Form.Control.Feedback type='invalid' className='m-0'>
						{formik.errors.description}
					</Form.Control.Feedback>
				</Form.Group>
			</div>
			<div className='d-flex flex-column justify-content-around'>
				{id ? (
					<>
						<Button
							variant='danger'
							className='rounded-pill'
							onClick={() =>
								deleteObservation({ observationId: id })
							}
						>
							<RiDeleteBin6Line size={24} />
						</Button>
						<Button
							type='submit'
							variant='info'
							className='rounded-pill'
						>
							<FiEdit size={24} />
						</Button>
					</>
				) : (
					<Button
						type='submit'
						variant='success'
						className='rounded-pill'
					>
						<BsCheckCircle size={24} />
					</Button>
				)}
			</div>
		</Form>
	)
}
