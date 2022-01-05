import { IDatabaseCarObject } from 'src/types/DatabaseObject'

import { IEditableObject } from '../types/EditableObject'

const transformEditCarToDB = (obj: IEditableObject): IDatabaseCarObject => {
  const newObj = {
    position: obj.position && {
      x: obj.position[0],
      y: obj.position[1],
      z: obj.position[2],
    },
    rotation: obj.rotation && {
      x: obj.rotation[0],
      y: obj.rotation[1],
      z: obj.rotation[2],
    },
  }

  if (!obj.position) delete newObj.position
  if (!obj.rotation) delete newObj.rotation

  return newObj
}

export default transformEditCarToDB
