import { IEditableObject } from 'src/types/EditableObject'

import { IDatabaseFinishObject } from '../types/DatabaseObject'

const transformEditFinishToDB = (
  obj: IEditableObject,
): IDatabaseFinishObject => {
  const newObj = {
    position: obj.position && {
      x: obj.position[0],
      y: obj.position[1],
      z: obj.position[2],
    },
  }

  if (!obj.position) delete newObj.position

  return newObj
}

export default transformEditFinishToDB
