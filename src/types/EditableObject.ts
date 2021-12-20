import { MeshProps } from '@react-three/fiber'

import { TObjectTypes } from './ObjectTypes'

export interface IEditableObject extends Omit<MeshProps, 'id'> {
  id: string
  objectType: TObjectTypes
}
