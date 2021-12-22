import { deleteDoc, doc } from 'firebase/firestore'

import { db } from '../config/firebase'

const deleteLevel = async (currentDocID: string) => {
  const levelsCollectionRef = doc(db, 'levels/', currentDocID)

  // @ts-ignore
  await deleteDoc(levelsCollectionRef)
}

export { deleteLevel }
