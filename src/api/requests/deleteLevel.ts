import { deleteDoc, doc } from 'firebase/firestore'

import { db } from '../firebase'

const deleteLevel = async (currentDocID: string) => {
  const levelsCollectionRef = doc(db, 'levels/', currentDocID)

  await deleteDoc(levelsCollectionRef)
}

export default deleteLevel
