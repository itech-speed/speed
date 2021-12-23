import { doc, updateDoc } from 'firebase/firestore'
import { IDatabaseLevel } from 'src/types/DatabaseObject'

import { db } from '../firebase'

const updateLevel = async (level: IDatabaseLevel, currentDocID: string) => {
  const levelsCollectionRef = doc(db, 'levels/', currentDocID)

  await updateDoc(levelsCollectionRef, {
    ...level,
  })
}

export default updateLevel
