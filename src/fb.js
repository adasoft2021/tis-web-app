import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

export const app = firebase.initializeApp({
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	locationId: process.env.REACT_APP_FIREBASE_LOCATION_ID,
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})
