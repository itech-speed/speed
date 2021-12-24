import { IDatabaseObject } from 'src/types/DatabaseObject'
import { IPlayObject } from 'src/types/PlayObject'
import { TTriplet } from 'src/types/Triplet'

import { USERDATA_WALL } from '../res/userDataName'

const transformDBObjectToPlay = (obj: IDatabaseObject): IPlayObject => {
  const newObj = {
    ...obj,
    position:
      obj.position &&
      ([obj.position.x, obj.position.y, obj.position.z] as TTriplet),
    rotation:
      obj.rotation &&
      ([obj.rotation.x, obj.rotation.y, obj.rotation.z] as TTriplet),
    args:
      obj.size &&
      (obj.objectType === 'cylinder'
        ? ([obj.size.x, obj.size.z, obj.size.y, 16] as any)
        : ([obj.size.x, obj.size.y, obj.size.z] as TTriplet)),
    type: obj.physicType || 'Static',
    userData: {
      id: obj.id === 'arrow' ? 'arrow' : obj.collideType || USERDATA_WALL,
    },
  }

  return newObj
}

export default transformDBObjectToPlay
