import { IDatabaseFinishObject } from 'src/types/DatabaseObject'
import { IPlayObject } from 'src/types/PlayObject'
import { TTriplet } from 'src/types/Triplet'

import { USERDATA_ARROW } from '../res/userDataName'
import { TCollideType } from '../types/CollideType'
import { TObjectTypes } from '../types/ObjectTypes'
import { TPhysicType } from '../types/PhysicType'

const transformFinishDBtoPlay = (obj: IDatabaseFinishObject): IPlayObject => {
  const finishObjectType: TObjectTypes = 'arrow'
  const finishPhysicType: TPhysicType = 'Static'
  const finishCollideType: TCollideType = USERDATA_ARROW
  const newObj = {
    ...obj,
    id: 'arrow',
    position:
      obj.position &&
      ([obj.position.x, obj.position.y, obj.position.z] as TTriplet),
    type: finishPhysicType,
    objectType: finishObjectType,
    userData: {
      id: finishCollideType,
    },
  }

  return newObj
}

export default transformFinishDBtoPlay
