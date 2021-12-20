import { useState } from 'react'
import Comment from './Comment'

export default function CommentsList({ Title, conversation }) {
	const [primaryUser] = useState('ADVISER')

	const listconversations = [
		{
			id: 1,
			comment: 'Buenas tardes, Que tienen que decirme?',
			date: '7/12/2021',
			typeuser: 'ADVISER',
		},
		{
			id: 2,
			comment:
				'Buenas noches. Se tienen las siguientes dudas para el espacio de discusión en el sistema, respecto al alcance de la funcionalidad. 1.¿Quien puede iniciar una discusión?. Grupo empresa, Asesor o Ambos 2.¿Las discusiones son privadas o existen discusiones públicas, dentro del marco de una convocatoria? 3.¿Las discusiones creadas tendrán hilos conversacionales o subcomentarios? Como grupo empresa consideramos que para preservar la continuidad de una conversación los comentarios no deberían poder ser eliminados o editados.',
			date: '8/12/2021',
			typeuser: 'GE',
		},
		{
			id: 3,
			comment: 'Hagan lo que le paresca mejor para dar una solucion',
			date: '9/12/2021',
			typeuser: 'ADVISER',
		},
		{
			id: 4,
			comment:
				'Buenas noches. Se tienen las siguientes dudas para el espacio de discusión en el sistema, respecto al alcance de la funcionalidad. 1.¿Quien puede iniciar una discusión?. Grupo empresa, Asesor o Ambos 2.¿Las discusiones son privadas o existen discusiones públicas, dentro del marco de una convocatoria? 3.¿Las discusiones creadas tendrán hilos conversacionales o subcomentarios? Como grupo empresa consideramos que para preservar la continuidad de una conversación los comentarios no deberían poder ser eliminados o editados.',
			date: '10/12/2021',
			typeuser: 'GE',
		},
		{
			id: 5,
			comment:
				'Buenas noches. Se tienen las siguientes dudas para el espacio de discusión en el sistema, respecto al alcance de la funcionalidad. 1.¿Quien puede iniciar una discusión?. Grupo empresa, Asesor o Ambos 2.¿Las discusiones son privadas o existen discusiones públicas, dentro del marco de una convocatoria? 3.¿Las discusiones creadas tendrán hilos conversacionales o subcomentarios? Como grupo empresa consideramos que para preservar la continuidad de una conversación los comentarios no deberían poder ser eliminados o editados.',
			date: '11/12/2021',
			typeuser: 'ADVISER',
		},
		{
			id: 6,
			comment:
				'Buenas noches. Se tienen las siguientes dudas para el espacio de discusión en el sistema, respecto al alcance de la funcionalidad. 1.¿Quien puede iniciar una discusión?. Grupo empresa, Asesor o Ambos 2.¿Las discusiones son privadas o existen discusiones públicas, dentro del marco de una convocatoria? 3.¿Las discusiones creadas tendrán hilos conversacionales o subcomentarios? Como grupo empresa consideramos que para preservar la continuidad de una conversación los comentarios no deberían poder ser eliminados o editados.',
			date: '12/12/2021',
			typeuser: 'GE',
		},
		{
			id: 7,
			comment:
				'Buenas noches. Se tienen las siguientes dudas para el espacio de discusión en el sistema, respecto al alcance de la funcionalidad. 1.¿Quien puede iniciar una discusión?. Grupo empresa, Asesor o Ambos 2.¿Las discusiones son privadas o existen discusiones públicas, dentro del marco de una convocatoria? 3.¿Las discusiones creadas tendrán hilos conversacionales o subcomentarios? Como grupo empresa consideramos que para preservar la continuidad de una conversación los comentarios no deberían poder ser eliminados o editados.',
			date: '13/12/2021',
			typeuser: 'ADVISER',
		},
		{
			id: 8,
			comment:
				'Buenas noches. Se tienen las siguientes dudas para el espacio de discusión en el sistema, respecto al alcance de la funcionalidad. 1.¿Quien puede iniciar una discusión?. Grupo empresa, Asesor o Ambos 2.¿Las discusiones son privadas o existen discusiones públicas, dentro del marco de una convocatoria? 3.¿Las discusiones creadas tendrán hilos conversacionales o subcomentarios? Como grupo empresa consideramos que para preservar la continuidad de una conversación los comentarios no deberían poder ser eliminados o editados.',
			date: '14/12/2021',
			typeuser: 'GE',
		},
		{
			id: 9,
			comment:
				'Buenas noches. Se tienen las siguientes dudas para el espacio de discusión en el sistema, respecto al alcance de la funcionalidad. 1.¿Quien puede iniciar una discusión?. Grupo empresa, Asesor o Ambos 2.¿Las discusiones son privadas o existen discusiones públicas, dentro del marco de una convocatoria? 3.¿Las discusiones creadas tendrán hilos conversacionales o subcomentarios? Como grupo empresa consideramos que para preservar la continuidad de una conversación los comentarios no deberían poder ser eliminados o editados.',
			date: '15/12/2021',
			typeuser: 'ADVISER',
		},
	]

	return (
		<div>
			<h1 className='text-secondary text-center'>Tema de Discusíon</h1>
			{listconversations.map((comment) => (
				<>
					<Comment
						key={comment.id}
						typeuser={comment.typeuser}
						primaryUser={primaryUser}
						comment={comment.comment}
						date={comment.date}
					></Comment>
				</>
			))}
		</div>
	)
}
