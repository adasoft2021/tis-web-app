import LinkList from './LinkList'

const DisplayLinkList = ({ title, description, linkList }) => {
	return (
		<>
			<h2>{title}</h2>
			<p>{description}</p>
			<LinkList list={linkList} />
		</>
	)
}

export default DisplayLinkList
