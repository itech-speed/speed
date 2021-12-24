import Arrow from 'src/components/models/Arrow'
import ArrowFiber from 'src/components/models/ArrowFiber'
import BeetleFiber from 'src/components/models/Beetle/BeetleFiber'
import Box from 'src/components/models/Box'
import BoxFiber from 'src/components/models/BoxFiber'
import Cylinder from 'src/components/models/Cylinder'
import CylinderFiber from 'src/components/models/CylinderFiber'
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
      : objectType === 'car'
      ? BeetleFiber
      : ArrowFiber
  } else {
    return objectType === 'box'
      ? Box
      : objectType === 'cylinder'
      ? Cylinder
      : Arrow
  }
}
