import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Page from '../Page'

export default function Board() {
	const offer = {
		name: 'ADASOFT',
		file: process.env.PUBLIC_URL + '/files/ADASOFTParteA.pdf',
		partA: process.env.PUBLIC_URL + '/files/ADASOFTPartA.zip',
		partB: process.env.PUBLIC_URL + '/files/ADASOFTPartB.zip',
	}

	const openInNewTab = (url) => {
		const newWindow = window.open(url)
		if (newWindow) newWindow.opener = null
		console.log(url)
	}

	return (
		<Page>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>GE</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>ADASOFT</td>
						<td>25/9/2021</td>
						<td>
							<a onClick={() => openInNewTab(offer.file)}>
								{' '}
								<Button>VER(pdf)</Button>
							</a>
							<a href={offer.partA} download>
								<Button>Descargar ParteA</Button>
							</a>
							<a href={offer.partB} download>
								<Button>Descargar ParteB</Button>
							</a>
						</td>
					</tr>
					<tr>
						<td />
						<td />
						<td />
						<td />
					</tr>
				</tbody>
			</Table>
		</Page>
	)
}
