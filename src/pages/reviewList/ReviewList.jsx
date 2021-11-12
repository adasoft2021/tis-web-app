import DisplayLinkList from '../../components/DisplayLinkList'
import Page from '../Page'

const reviews = [
	{
		id: 1,
		title: 'Orden de Cambio',
	},
	{
		id: 2,
		title: 'Adenda',
	},
]

const ReviewList = () => {
	return (
		<Page>
			<DisplayLinkList
				title='Revisiones'
				description=''
				linkList={reviews}
			/>
		</Page>
	)
}

export default ReviewList
