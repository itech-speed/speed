import { MeshStandardMaterialProps } from '@react-three/fiber'

import { TCollideType } from './CollideType'
import { TObjectTypes } from './ObjectTypes'
import { TPhysicType } from './PhysicType'

export interface IDatabaseLevel {
  id: string
  uid?: string
  img: string
  car: IDatabaseObject
  objects: IDatabaseObject[]
}

export interface IDatabaseObject {
  id: string
  objectType: TObjectTypes
  physicType?: TPhysicType
  collideType?: TCollideType
  position?: Vector
  rotation?: Vector
  size?: Vector & { segments?: number }
  material?: MeshStandardMaterialProps
}

interface Vector {
  x: number
  y: number
  z: number
}
