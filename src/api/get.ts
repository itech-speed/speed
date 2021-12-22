import { collection, getDocs } from 'firebase/firestore'

import { db } from '../config/firebase'

const levelsCollectionRef = collection(db, 'levels')

const getLevels = async () => {
  const data = await getDocs(levelsCollectionRef)
  return data.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))
}

export { getLevels }
