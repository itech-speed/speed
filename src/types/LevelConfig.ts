import { BodyProps } from '@react-three/cannon'

import { TObjectTypes } from './ObjectTypes'

interface IObject extends BodyProps {
  objectType: TObjectTypes
}

export interface ILevelConfig {
  id: number | string
  img: string
  car: BodyProps
  objects: IObject[]
}
