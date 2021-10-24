import Page from '../Page'

export default function Board() {
	const offer = {
		name: 'ADASOFT',
		file: '/files/ADASOFTParteA.pdf',
	}

	const openInNewTab = (url) => {
		const newWindow = window.open(url)
		if (newWindow) newWindow.opener = null
	}

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
