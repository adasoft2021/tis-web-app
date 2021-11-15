import { Route, Switch } from 'wouter'
import { ObservationProvider } from '../context/providers/ObservationContext'
import { ProposalProvider } from '../context/providers/ProposalContext'
import { ReviewProvider } from '../context/providers/ReviewContext'
import { CompanyProvider } from '../context/providers/CompanyContext'
import { SpaceAnswerProvider } from '../context/providers/SpaceAnswerContext'
import { ProyectProvider } from '../context/providers/ProyectContext'
import { SpaceProvider } from '../context/providers/SpaceContext'
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
	Review,
} from '../pages'
import { ReviewsList } from '../pages/reviews/ReviewsList'

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
				path='/reviews/:reviewId'
				component={({ params: { reviewId } }) => (
					<ProposalProvider>
						<ObservationProvider>
							<ReviewProvider>
								<Review reviewId={reviewId} />
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
			<Route path='/file' component={File} />
			<Route path='/register' component={Register} />
			<Route path='/additional-info' component={AdditionalGE} />
			<Route path='/boardFile' component={BoardFileUpload} />
			<Route
				path='/proposals-presentation/:spaceTitle/:spaceId'
				component={({ params: { spaceId, spaceTitle } }) => (
					<SpaceAnswerProvider>
						<BoardFileUpload
							spaceId={spaceId}
							spaceTitle={decodeURI(spaceTitle)}
						/>
					</SpaceAnswerProvider>
				)}
			/>
			<Route
				path='/project-development/:spaceTitle/:spaceId'
				component={({ params: { spaceId, spaceTitle } }) => (
					<SpaceAnswerProvider>
						<BoardFileUpload
							spaceId={spaceId}
							spaceTitle={decodeURI(spaceTitle)}
						/>
					</SpaceAnswerProvider>
				)}
			/>
			<Route
				path='/final-evaluation/:spaceTitle/:spaceId'
				component={({ params: { spaceId, spaceTitle } }) => (
					<SpaceAnswerProvider>
						<BoardFileUpload
							spaceId={spaceId}
							spaceTitle={decodeURI(spaceTitle)}
						/>
					</SpaceAnswerProvider>
				)}
			/>
			<Route
				path='/reviews'
				component={(props) => (
					<ProyectProvider>
						<CompanyProvider>
							<SpaceProvider>
								<ReviewProvider>
									<ReviewsList {...props} />
								</ReviewProvider>
							</SpaceProvider>
						</CompanyProvider>
					</ProyectProvider>
				)}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	)
}
