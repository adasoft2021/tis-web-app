import React, { useState } from 'react'
import { useReview } from '../../context/providers/ReviewContext'
import Qualification from './qualification'
const Revision = () => {
	const { createReview, isLoading, review } = useReview()
	const [datos, setDatos] = useState({
		nombreGE: 'Nombre G.E.',
		one: '',
		two: '',
		three: '',
		for: '',
		five: '',
		six: '',
		seven: '',
		comment: '',
	})

	const descriptions = [
		{
			id: 1,
			description: 'Cumplimiento de especicaciones del proponente',
			points: '/15 puntos',
			min: 0,
			max: 15,
			name: 'one',
		},
		{
			id: 2,
			description: 'Claridad en la organizacion de la empresa proponente',
			points: '/10 puntos',
			min: 0,
			max: 10,
			name: 'two',
		},
		{
			id: 3,
			description: 'Cumplimiento de especicaciones tecnicas',
			points: '/30 puntos',
			min: 0,
			max: 30,
			name: 'three',
		},
		{
			id: 4,
			description: 'Claridad en el proceso de desarrollo',
			points: '/10 puntos',
			min: 0,
			max: 10,
			name: 'for',
		},
		{
			id: 5,
			description: 'Plazo de ejecucion',
			points: '/10 puntos',
			min: 0,
			max: 10,
			name: 'five',
		},
		{
			id: 6,
			description: 'Precio total',
			points: '/15 puntos',
			min: 0,
			max: 15,
			name: 'six',
		},
		{
			id: 7,
			description: 'Uso de herramientas en el proceso de desarrollo',
			points: '/10 puntos',
			min: 0,
			max: 10,
			name: 'seven',
		},
	]

	const handleInputChange = (event) => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		})
	}
	const enviarDatos = async (event) => {
		event.preventDefault()
		const reviewDTO = {
			score: parseInt(datos.one),
			comment: datos.comment,
			createdById: 1,
		}
		await createReview(reviewDTO)
		console.log('Al Backend')
	}

	return (
		<form className='card bg-dark ' onSubmit={enviarDatos}>
			<div className='card-body text-light' style={{ margin: 55 }}>
				<h1 className='card-title text-center  ' style={{ margin: 30 }}>
					REVISIÓN TIS: ({datos.nombreGE})
				</h1>

				<hr style={{ margin: 50 }}></hr>

				{descriptions.map((qualification) => (
					<div key={qualification.id}>
						<Qualification
							descri={qualification.description}
							points={qualification.points}
							min={qualification.min}
							max={qualification.max}
							name={qualification.name}
							onchange={handleInputChange}
						/>
					</div>
				))}

				<div className='' style={{ marginTop: 60 }}>
					<h2>Comentario</h2>
					<textarea
						className='form-control'
						id='Textarea1'
						rows='3'
						name='comment'
						onChange={handleInputChange}
					></textarea>
				</div>
				<div className='text-center'>
					<button
						type='submit'
						className='btn btn-primary btn-onle '
						style={{ margin: 30, fontSize: 24 }}
					>
						REVISADO
						<h1>!{datos.three}</h1>
					</button>
				</div>
				{isLoading && <p>La petición se está procesando...</p>}
				{review.title && (
					<p>
						<strong>Error: </strong>
						{review.title}
					</p>
				)}
			</div>
		</form>
	)
}

export default Revision
