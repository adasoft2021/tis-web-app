import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
const {
	FIREBASE_PROJECT_ID,
	FIREBASE_APP_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_LOCATION_ID,
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_MEASUREMENT_ID,
} = require('./config/environment')
export const app = firebase.initializeApp({
	projectId: FIREBASE_PROJECT_ID,
	appId: FIREBASE_APP_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	locationId: FIREBASE_LOCATION_ID,
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	measurementId: FIREBASE_MEASUREMENT_ID,
})
