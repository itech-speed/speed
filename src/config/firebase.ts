import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import config from './config'

const app = initializeApp(config.firebase)

// export const Providers = {
//   google: new firebase.auth.GoogleAuthProvider(),
// }
//
// export const auth = firebase.auth()
export const db = getFirestore(app)
