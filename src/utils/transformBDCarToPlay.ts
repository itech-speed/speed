import { IDatabaseCarObject } from 'src/types/DatabaseObject'
import { IPlayObject } from 'src/types/PlayObject'
import { TTriplet } from 'src/types/Triplet'

import { TObjectTypes } from '../types/ObjectTypes'

const transformBDCarToPlay = (obj: IDatabaseCarObject): IPlayObject => {
  const carObjectType: TObjectTypes = 'car'
  const newObj = {
    ...obj,
    id: 'car',
    objectType: carObjectType,
    position:
      obj.position &&
      ([obj.position.x, obj.position.y, obj.position.z] as TTriplet),
    rotation:
      obj.rotation &&
      ([obj.rotation.x, obj.rotation.y, obj.rotation.z] as TTriplet),
  }

  if (!obj.rotation) {
    delete newObj.rotation
  }

  return newObj
}

export default transformBDCarToPlay
