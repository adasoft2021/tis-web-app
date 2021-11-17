import LinkList from './LinkList'

const DisplayLinkList = ({ title, description, linkList, emptyMessage }) => {
	return (
		<>
			<h2>{title}</h2>
			<p>{description}</p>
			{linkList.length ? (
				<LinkList list={linkList} />
			) : (
				<h5>{emptyMessage}</h5>
			)}
		</>
	)
}

export default DisplayLinkList
