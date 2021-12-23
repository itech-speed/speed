import { TCollideType } from './CollideType'
import { TObjectTypes } from './ObjectTypes'
import { TPhysicType } from './PhysicType'
import { TTriplet } from './Triplet'

export interface IPlayObject {
  id: string
  objectType: TObjectTypes
  position?: TTriplet
  rotation?: TTriplet
  args?: TTriplet
  type?: TPhysicType
  userData?: {
    id: TCollideType
  }
}
