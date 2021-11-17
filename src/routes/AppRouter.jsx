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
	File,
	Register,
	AdditionalGE,
	BoardFileUpload,
	Review,
	ReviewCompany,
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
				component={(props) => {
					return userType === 'ADVISER' ? (
						<ProposalProvider>
							<ObservationProvider>
								<ReviewProvider>
									<Review {...props} />
								</ReviewProvider>
							</ObservationProvider>
						</ProposalProvider>
					) : (
						<ObservationProvider>
							<ReviewProvider>
								<ReviewCompany {...props} />
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
