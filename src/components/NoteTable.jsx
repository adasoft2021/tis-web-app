import Table from 'react-bootstrap/Table'

const notas = [
	{
		id: '1',
		descripcion: 'Cumplimientos de especificaiones del proponente',
		puntaje_referencial: '15 puntos',
		puntaje_obtenido: '14',
	},
	{
		ide: '2',
		descripcion: 'Claridad en la organizacion de la empresa proponente',
		puntaje_referencial: '10 puntos ',
		puntaje_obtenido: '9',
	},
	{
		id: '3',
		descripcion: 'Cumplimientos de especificaciones técnicas',
		puntaje_referencial: '30 puntos',
		puntaje_obtenido: '23',
	},
	{
		id: '4',
		descripcion: 'Claridad en el proceso de dearrollo',
		puntaje_referencial: '10 puntos',
		puntaje_obtenido: '7',
	},
	{
		id: '5',
		descripcion: 'Plazo de ejecucion',
		puntaje_referencial: '10 puntos',
		puntaje_obtenido: '10',
	},
	{
		id: '6',
		descripcion: 'Precio total',
		puntaje_referencial: '15 puntos',
		puntaje_obtenido: '10',
	},
	{
		id: '7',
		descripcion: 'Uso de herramientas en el proceso de desarrollo ',
		puntaje_referencial: '10 puntos',
		puntaje_obtenido: '9',
	},
]

const NoteTable = () => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Descripción</th>
					<th>Puntaje Referencial</th>
					<th>Puntaje Obtenido</th>
				</tr>
			</thead>
			<tbody>
				{notas.map((calificacion) => (
					<tr key={calificacion.id}>
						<td>{calificacion.descripcion}</td>
						<td>{calificacion.puntaje_referencial}</td>
						<td>{calificacion.puntaje_obtenido}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default NoteTable
