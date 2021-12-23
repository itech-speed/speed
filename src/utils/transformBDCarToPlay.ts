import { IDatabaseObject } from 'src/types/DatabaseObject'
import { IPlayObject } from 'src/types/PlayObject'
import { TTriplet } from 'src/types/Triplet'

const transformBDCarToPlay = (obj: IDatabaseObject): IPlayObject => {
  const newObj = {
    ...obj,
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
  delete newObj.size

  return newObj
}

export default transformBDCarToPlay
