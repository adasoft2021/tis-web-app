import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compact/firestore'

export const app = firebase.initializeApp({
	projectId: 'tis-storage',
	appId: '1:1085653129147:web:6f5ed4c92e4548e1fcd69e',
	storageBucket: 'tis-storage.appspot.com',
	locationId: 'us-central',
	apiKey: 'AIzaSyDNQjnUW_IJTPhLcx8IDBQLmMFyvDS3ZGY',
	authDomain: 'tis-storage.firebaseapp.com',
	messagingSenderId: '1085653129147',
	measurementId: 'G-43JBQ0KTN3',
})
