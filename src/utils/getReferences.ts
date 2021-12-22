import { doc } from 'firebase/firestore'

import { db } from '../config/firebase'
import { getCollideTypeID, getObjectTypeID } from './getTypesID'

const getReferences = async (obj: any) => {
  const objectTypeID = await getObjectTypeID(obj.objectType)
  const collideTypeID = await getCollideTypeID(obj.collideType)
  console.log({ collideTypeID })

  return {
    objectType: objectTypeID
      ? doc(db, `object_types/${objectTypeID}`)
      : undefined,
    collideType: collideTypeID
      ? doc(db, `collideTypes/${collideTypeID}`)
      : undefined,
  }
}

export { getReferences }
