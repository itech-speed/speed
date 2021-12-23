import { collection, getDocs } from 'firebase/firestore'
import { IDatabaseLevel } from 'src/types/DatabaseObject'

import { db } from '../firebase'

const levelsCollectionRef = collection(db, 'levels')

const getLevels = async (): Promise<IDatabaseLevel[]> => {
  const data = await getDocs(levelsCollectionRef)
  return data.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id,
  })) as IDatabaseLevel[]
}

export default getLevels
