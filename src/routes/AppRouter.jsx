import { Route, Switch } from 'wouter'
import { ObservationProvider } from '../context/providers/ObservationContext'
import { ProposalProvider } from '../context/providers/ProposalContext'
import { ReviewProvider } from '../context/providers/ReviewContext'
import { CompanyProvider } from '../context/providers/CompanyContext'
import { SpaceAnswerProvider } from '../context/providers/SpaceAnswerContext'
import { ProjectProvider } from '../context/providers/ProjectContext'
import { SpaceProvider } from '../context/providers/SpaceContext'
import { ReviewsList } from '../pages/reviews/ReviewsList'
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
	ReviewCompany,
	SpaceAnswer,
} from '../pages'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'
import ReviewList from '../pages/reviewList/ReviewList'

export default function AppRouter() {
	const { userType } = useUserCredentials()
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
				component={({ params }) => {
					return userType === 'ADVISER' ? (
						<ProposalProvider>
							<ObservationProvider>
								<ReviewProvider>
									<Review {...params} />
								</ReviewProvider>
							</ObservationProvider>
						</ProposalProvider>
					) : (
						<ObservationProvider>
							<ReviewProvider>
								<ReviewCompany {...params} />
							</ReviewProvider>
						</ObservationProvider>
					)
				}}
			/>
			<ReviewProvider>
				<Route path='/reviews' component={ReviewList} />
			</ReviewProvider>
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
					<ProjectProvider>
						<CompanyProvider>
							<SpaceProvider>
								<ReviewProvider>
									<ReviewsList {...props} />
								</ReviewProvider>
							</SpaceProvider>
						</CompanyProvider>
					</ProjectProvider>
				)}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	)
}
