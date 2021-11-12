import Page from '../Page'
import useEffect from 'react'
import { useProposal } from '../../context/providers/ProposalContext'

export default function Board() {
	const offer = {
		name: 'ADASOFT',
		file: '/files/ADASOFTParteA.pdf',
	}

	const openInNewTab = (url) => {
		const newWindow = window.open(url)
		if (newWindow) newWindow.opener = null
	}
	const { getProposal } = useProposal()

	useEffect(() => {
		getProposal(1)
	}, [])

	return (
		<Page>
			<a
				onClick={() =>
					openInNewTab(process.env.PUBLIC_URL + offer.file)
				}
			>
				<button>VER</button>
			</a>
		</Page>
	)
}
