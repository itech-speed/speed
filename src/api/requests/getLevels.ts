import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
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
  orderBy('id'),
)
const allLevelsQuery = query(
  levelsCollectionRef,
  orderBy('customLevel'),
  orderBy('id'),
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

export const getAllLevels = async (): Promise<IDatabaseLevel[]> => {
  const data = await getDocs(allLevelsQuery)
  return data.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id,
  })) as IDatabaseLevel[]
}
