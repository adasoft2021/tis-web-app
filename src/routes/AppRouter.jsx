import { Route, Switch } from 'wouter'
import { ObservationProvider } from '../context/providers/ObservationContext'
import { ProposalProvider } from '../context/providers/ProposalContext'
import { ReviewProvider } from '../context/providers/ReviewContext'
import { CompanyProvider } from '../context/providers/CompanyContext'
import { SpaceAnswerProvider } from '../context/providers/SpaceAnswerContext'
import {
	Board,
	NotFoundPage,
	Announcement,
	SpecificationSheet,
	CompaniesList,
	HomePage,
	Register,
	AdditionalGE,
	BoardFileUpload,
	Review,
	SpaceAnswer,
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
				path='/reviews'
				component={(props) => (
					<ProposalProvider>
						<ObservationProvider>
							<ReviewProvider>
								<Review {...props} />
							</ReviewProvider>
						</ObservationProvider>
					</ProposalProvider>
				)}
			/>
			<Route
				path='/companies'
				component={(props) => (
					<CompanyProvider>
						<CompaniesList {...props} />
					</CompanyProvider>
				)}
			/>

			<Route path='/register' component={Register} />
			<Route path='/additional-info' component={AdditionalGE} />
			<Route path='/boardFile' component={BoardFileUpload} />
			<Route
				path='/proposals-presentation/:spaceId'
				component={SpaceAnswer}
			/>
			<Route
				path='/project-development/:spaceId'
				component={SpaceAnswer}
			/>
			<Route path='/final-evaluation/:spaceId' component={SpaceAnswer} />
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
