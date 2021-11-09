import { Route, Switch } from 'wouter'
import { CompanyProvider } from '../context/providers/CompanyContext'
import { SpaceAnswerProvider } from '../context/providers/SpaceAnswerContext'
import {
	Board,
	NotFoundPage,
	Announcement,
	SpecificationSheet,
	CompaniesList,
	HomePage,
	File,
	Register,
	AdditionalGE,
	BoardFileUpload,
} from '../pages'

export default function AppRouter() {
	return (
		<Switch>
			<Route path='/' component={HomePage} />
			<Route path='/announcements' component={Announcement} />
			<Route path='/tablero' component={Board} />
			<Route path='/404' component={NotFoundPage} />
			<Route
				path='/specification_sheets'
				component={SpecificationSheet}
			/>
			<Route
				path='/companies'
				component={(props) => (
					<CompanyProvider>
						<CompaniesList {...props} />
					</CompanyProvider>
				)}
			/>
			<Route path='/file' component={File} />
			<Route path='/register' component={Register} />
			<Route path='/additional-info' component={AdditionalGE} />
			<Route path='/boardFile' component={BoardFileUpload} />
			<SpaceAnswerProvider>
				<Route
					path='/proposals-presentation/:spaceTitle/:spaceId'
					component={({ params: { spaceId, spaceTitle } }) => (
						<BoardFileUpload
							spaceId={spaceId}
							spaceTitle={decodeURI(spaceTitle)}
						/>
					)}
				/>
				<Route
					path='/project-development/:spaceTitle/:spaceId'
					component={({ params: { spaceId, spaceTitle } }) => (
						<BoardFileUpload
							spaceId={spaceId}
							spaceTitle={decodeURI(spaceTitle)}
						/>
					)}
				/>
				<Route
					path='/final-evaluation/:spaceTitle/:spaceId'
					component={({ params: { spaceId, spaceTitle } }) => (
						<BoardFileUpload
							spaceId={spaceId}
							spaceTitle={decodeURI(spaceTitle)}
						/>
					)}
				/>
			</SpaceAnswerProvider>
			<Route component={NotFoundPage} />
		</Switch>
	)
}
