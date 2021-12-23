import { addDoc, collection } from 'firebase/firestore'
import { IDatabaseLevel } from 'src/types/DatabaseObject'

import { db } from '../firebase'

const levelsCollectionRef = collection(db, 'levels')

const postLevel = async (level: IDatabaseLevel) => {
  await addDoc(levelsCollectionRef, level)
}

export default postLevel
