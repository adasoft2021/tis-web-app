import SpaceInformation from '../../components/SpaceInformation'
import { SpaceAnswerProvider } from '../../context/providers/SpaceAnswerContext'
import { SpaceProvider } from '../../context/providers/SpaceContext'
import UploadForm from '../../components/UploadForm'
import Page from '../Page'

const SpaceAnswer = ({ params: { spaceId } }) => {
	return (
		<Page>
			<SpaceProvider>
				<SpaceInformation spaceId={spaceId} />
			</SpaceProvider>
			<SpaceAnswerProvider>
				<div className='box'>
					<h2 className='header'>Formulario Subir Archivos</h2>
					<UploadForm
						onFileChange={(files) => {
							/* console.log(files) */
						}}
					/>
				</div>
			</SpaceAnswerProvider>
		</Page>
	)
}

export default SpaceAnswer
