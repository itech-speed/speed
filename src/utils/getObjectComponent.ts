import Arrow from 'src/components/levels/Arrow'
import Box from 'src/components/levels/Box'
import BoxFiber from 'src/components/levels/BoxFiber'
import Cylinder from 'src/components/levels/Cylinder'
import CylinderFiber from 'src/components/levels/CylinderFiber'
import { TObjectTypes } from 'src/types/ObjectTypes'

export const getObjectComponent = (
  objectType: TObjectTypes,
  fiber?: boolean,
): any => {
  if (fiber) {
    return objectType === 'box'
      ? BoxFiber
      : objectType === 'cylinder'
      ? CylinderFiber
      : Arrow
  } else {
    return objectType === 'box'
      ? Box
      : objectType === 'cylinder'
      ? Cylinder
      : Arrow
  }
}
