import NoteTable from '../../components/NoteTable'
import Page from '../Page'

const NotificationConformity = () => {
	const titulo = 'Notificacion de conformidad'
	const nombreAsesor = 'Maria Leticia Coca Blanco'
	const fecha = '14/11/2021'
	const comentario =
		'TIS acepta la propuesta técnica presentada por su empresa: DFS S.R.L.. Por lo que solicita hacersepresente el viernes 13 de marzo del 2020 a horas 9:30 a realizar firma de contrato, via reuni’on en meet.. Paralelamente se solicita, llenar la planilla adjunta - RESUMENGRUPOEMPRESA; con la información resumen de su propuesta técnica. En este archivo debe registrar el día que su GE ha elegido para el seguimiento de su propuesta de desarrollo en el tiempo que dure el contrato con TIS. Asímismo, recordar que para el día de la firma del contrato se requiere la entrega de la planilla resumen requerida.'
	return (
		<>
			<Page>
				<div className='d-flex align-items-center flex-column'>
					<h2> {titulo} </h2>

					<p> {nombreAsesor} </p>
					<p> {fecha} </p>
					<NoteTable />
					<p> {comentario} </p>
				</div>
			</Page>
		</>
	)
}

export default NotificationConformity
