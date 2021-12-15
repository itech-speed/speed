import Arrow from 'src/components/levels/Arrow'
import Box from 'src/components/levels/Box'
import Cylinder from 'src/components/levels/Cylinder'
import { TObjectTypes } from 'src/types/ObjectTypes'

export const getObjectComponent = (objectType: TObjectTypes): any => {
  return objectType === 'box'
    ? Box
    : objectType === 'cylinder'
    ? Cylinder
    : Arrow
}
