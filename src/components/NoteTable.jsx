import Table from 'react-bootstrap/Table'

const NoteTable = ({ qualifications }) => {
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
				{qualifications.map((qualification) => (
					<tr key={qualification.id}>
						<td>{qualification.description}</td>
						<td>{qualification.maxScore}</td>
						<td>{qualification.score}</td>
					</tr>
				))}
				<tr>
					<td></td>
					<td>Total</td>
					<td>
						{qualifications
							.map((qualification) => qualification.score)
							.reduce((prev, current) => prev + current)}
					</td>
				</tr>
			</tbody>
		</Table>
	)
}

export default NoteTable
