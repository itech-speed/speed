import { addDoc, collection } from 'firebase/firestore'

import { db } from '../config/firebase'

const levelsCollectionRef = collection(db, 'levels')

const createLevel = async (payload: any) => {
  await addDoc(levelsCollectionRef, payload)
}

export { createLevel }
