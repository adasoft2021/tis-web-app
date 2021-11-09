import UploadForm from '../../components/UploadForm'
import Page from '../Page'
import './file.scss'

export default function File() {
	const onFileChange = (files) => {
		console.log(files)
	}

	return (
		<Page>
			<div className='box'>
				<h2 className='header'>Formulario Subir Archivos</h2>
				<UploadForm onFileChange={(files) => onFileChange(files)} />
			</div>
		</Page>
	)
}