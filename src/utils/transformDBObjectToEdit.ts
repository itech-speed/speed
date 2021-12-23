import { USERDATA_WALL } from 'src/res/userDataName'
import { IDatabaseObject } from 'src/types/DatabaseObject'
import { IEditableObject } from 'src/types/EditableObject'
import { TTriplet } from 'src/types/Triplet'

const transformDBObjectToEdit = (obj: IDatabaseObject): IEditableObject => {
  const newObj = {
    ...obj,
    position:
      obj.position &&
      ([obj.position.x, obj.position.y, obj.position.z] as TTriplet),
    rotation:
      obj.rotation &&
      ([obj.rotation.x, obj.rotation.y, obj.rotation.z] as TTriplet),
    scale:
      obj.size &&
      (obj.objectType === 'cylinder'
        ? ([obj.size.x, obj.size.z, obj.size.y] as TTriplet)
        : ([obj.size.x, obj.size.y, obj.size.z] as TTriplet)),
    physicType: obj.physicType || 'Static',
    collideType: obj.collideType || USERDATA_WALL,
  }
  if (!obj.size) {
    delete newObj.scale
  }
  delete newObj.size

  return newObj
}

export default transformDBObjectToEdit
