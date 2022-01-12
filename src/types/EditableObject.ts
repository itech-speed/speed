import { MeshStandardMaterialProps } from '@react-three/fiber'

import { TCollideType } from './CollideType'
import { TObjectTypes } from './ObjectTypes'
import { TPhysicType } from './PhysicType'
import { TTriplet } from './Triplet'

export interface IEditableObject {
  id: string
  position?: TTriplet
  rotation?: TTriplet
  scale?: TTriplet
  physicType?: TPhysicType
  collideType?: TCollideType
  objectType: TObjectTypes
  castShadow?: boolean
  material?: MeshStandardMaterialProps
}
