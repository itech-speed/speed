import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyACBV3YGL1jVY3BQkkJWKFQyfeMtF3eWOw',
  authDomain: 'itechart-speed.firebaseapp.com',
  projectId: 'itechart-speed',
  storageBucket: 'itechart-speed.appspot.com',
  messagingSenderId: '331857593604',
  appId: '1:331857593604:web:83839641e61aa662347c51',
  measurementId: 'G-J2EX0QY9XH',
}

const app = initializeApp(config)

export const db = getFirestore(app)
