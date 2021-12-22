import { addDoc, collection, doc, getDocs } from 'firebase/firestore'

import { db } from '../config/firebase'

const objectTypesCollectionRef = collection(db, 'object_types')
const collideTypesCollectionRef = collection(db, 'collideTypes')
const levelsCollectionRef = collection(db, 'levels')

const getLevels = async () => {
  const data = await getDocs(levelsCollectionRef)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const getObjectTypes = async () => {
  const data = await getDocs(objectTypesCollectionRef)
  // @ts-ignore
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const getCollideTypes = async () => {
  const data = await getDocs(collideTypesCollectionRef)
  // @ts-ignore
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const createLevel = async () => {
  await addDoc(levelsCollectionRef, {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    objects: [
      {
        // @ts-ignore
        objectTypeID: doc(db, `object_types/${objectTypes[0].id}`),
      },
    ],
  })
}

export { createLevel, getCollideTypes, getLevels, getObjectTypes }
