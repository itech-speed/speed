import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../config/firebase'

const updateLevel = async (payload: any, currentDocID: string) => {
  const levelsCollectionRef = doc(db, 'levels/', currentDocID)

  // @ts-ignore
  await updateDoc(levelsCollectionRef, {
    ...payload,
  })
}

export { updateLevel }
