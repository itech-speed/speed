import { USERDATA_WALL } from 'src/res/userDataName'
import { IDatabaseFinishObject } from 'src/types/DatabaseObject'
import { IEditableObject } from 'src/types/EditableObject'
import { TTriplet } from 'src/types/Triplet'

import { TCollideType } from '../types/CollideType'
import { TObjectTypes } from '../types/ObjectTypes'
import { TPhysicType } from '../types/PhysicType'

const transformDBFinishObjToEdit = (
  obj: IDatabaseFinishObject,
): IEditableObject => {
  const finishObjectType: TObjectTypes = 'arrow'
  const finishPhysicType: TPhysicType = 'Static'
  const finishCollideType: TCollideType = USERDATA_WALL
  const newObj = {
    ...obj,
    id: 'arrow',
    position:
      obj.position &&
      ([obj.position.x, obj.position.y, obj.position.z] as TTriplet),
    objectType: finishObjectType,
    physicType: finishPhysicType,
    collideType: finishCollideType,
  }

  return newObj
}

export default transformDBFinishObjToEdit
