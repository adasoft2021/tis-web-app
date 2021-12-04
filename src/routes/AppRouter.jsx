import { Route, Switch } from 'wouter'
import { ObservationProvider } from '../context/providers/ObservationContext'
import { ProposalProvider } from '../context/providers/ProposalContext'
import { ReviewProvider } from '../context/providers/ReviewContext'
import { CompanyProvider } from '../context/providers/CompanyContext'
import { SpaceAnswerProvider } from '../context/providers/SpaceAnswerContext'
import { ProjectProvider } from '../context/providers/ProjectContext'
import { SpaceProvider } from '../context/providers/SpaceContext'
import Reports from '../pages/report/Reports'
import GroupInformationReport from '../pages/report/GroupInformationReport'

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
	Project,
	ReviewCompany,
	SpaceAnswer,
} from '../pages'
import { useUserCredentials } from '../context/providers/UserCredentialsContext'
// import ReviewList from '../pages/reviewList/ReviewList'
import SpacesSubmitLinkList from '../pages/spacesLinkList/SpacesSubmitLinkList'

// import { userTypes } from '../context/reducers/userCredentialsReducer'

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
				component={({ params: { reviewId } }) => {
					return userType === 'ADVISER' ? (
						<ProposalProvider>
							<ObservationProvider>
								<ReviewProvider>
									<Review reviewId={reviewId} />
								</ReviewProvider>
							</ObservationProvider>
						</ProposalProvider>
					) : (
						<ObservationProvider>
							<ReviewProvider>
								<ReviewCompany reviewId={reviewId} />
							</ReviewProvider>
						</ObservationProvider>
					)
				}}
			/>

			<Route
				path='/spaces'
				component={() => (
					<SpaceProvider>
						<SpacesSubmitLinkList />
					</SpaceProvider>
				)}
			/>

			<Route
				path='/reviews'
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
				path='/reports'
				component={({ params: { spaceId, spaceTitle } }) => <Reports />}
			/>
			<Route
				path='/groupInformationReport'
				component={GroupInformationReport}
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
				path='/projects'
				component={() => (
					<ProjectProvider>
						{' '}
						<Project />{' '}
					</ProjectProvider>
				)}
			/>

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
			<Route component={NotFoundPage} />
		</Switch>
	)
}
