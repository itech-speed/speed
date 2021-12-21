import { Euler, Vector3 } from '@react-three/fiber'

import { USERDATA_PILLAR, USERDATA_WALL } from './../res/userDataName'
import { TObjectTypes } from './ObjectTypes'
import { TPhysicType } from './PhysicType'

export interface IEditableObject {
  id: string
  position?: Vector3
  rotation?: Euler
  scale?: Vector3
  physicType?: TPhysicType
  collideType?: typeof USERDATA_WALL | typeof USERDATA_PILLAR
  objectType: TObjectTypes
}
