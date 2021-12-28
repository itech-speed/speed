import { collection, getDocs, query, where } from 'firebase/firestore'
import { IDatabaseLevel } from 'src/types/DatabaseObject'

import { db } from '../firebase'

const levelsCollectionRef = collection(db, 'levels')
const customLevelsQuery = query(
  levelsCollectionRef,
  where('customLevel', '==', true),
)
const compainLevelsQuery = query(
  levelsCollectionRef,
  where('customLevel', '==', false),
)

export const getCompainLevels = async (): Promise<IDatabaseLevel[]> => {
  const data = await getDocs(compainLevelsQuery)
  return data.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id,
  })) as IDatabaseLevel[]
}

export const getCustomLevels = async (): Promise<IDatabaseLevel[]> => {
  const data = await getDocs(customLevelsQuery)
  return data.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id,
  })) as IDatabaseLevel[]
}

// export default { getCompainLevels, getCustomLevels }
