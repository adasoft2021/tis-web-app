import FileUploadCard from '../../components/FileUploadCard'
import { Col } from 'react-bootstrap'
const ListCard = ({ files }) => {
	function getTypeImg(url) {
		const part1 = url.split('?')[0]
		const part2 = part1.split('.')
		const tipo = part2[part2.length - 1]

		return tipo
	}
	const extensionsFile = [
		'jpg',
		'pdf',
		'accdb',
		'xlssx',
		'rar',
		'zip',
		'epub',
		'docx',
		'2mdl',
		'dbm',
		'java',
		'json',
		'mp4',
		'owl',
		'png',
		'gif',
		'jar',
		'Ink',
		'cdm',
		'pptx',
		'asf',
		'avi',
		'FLV',
		'MKV',
		'mov',
		'MPEG',
		'RM',
		'VOB',
		'WebM',
		'wmv',
		'mp3',
		'dbm',
	]
	return (
		<>
			{files.map((file) => {
				const typeImg = getTypeImg(file.url)
				const extensionFile = extensionsFile.find(
					(elemento) => elemento === typeImg
				)
				let pathImg = ''
				if (extensionFile) {
					pathImg = `/image/${typeImg}.png`
				} else {
					pathImg = '/image/default.png'
				}
				return (
					<Col sm={1} key={file.name}>
						<FileUploadCard
							pathImg={pathImg}
							cardTitle={file.name}
							url={file.url}
							target='_blank'
						/>
					</Col>
				)
			})}
		</>
	)
}

export default ListCard
