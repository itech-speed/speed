import { USERDATA_WALL } from 'src/res/userDataName'
import { IEditableObject } from 'src/types/EditableObject'

const transformEditObjToEdit = (obj: any): IEditableObject => {
  const newObj = {
    ...obj,
    scale:
      obj.args &&
      (obj.objectType === 'cylinder'
        ? [obj.args[0], obj.args[2], obj.args[1]]
        : [obj.args[0], obj.args[1], obj.args[2]]),
    physicType: obj.type || 'Static',
    collideType: obj.userData.id || USERDATA_WALL,
  }
  if (!obj.args) {
    delete newObj.scale
  }
  delete newObj.args
  delete newObj.type
  delete newObj.userData

  return newObj
}

export default transformEditObjToEdit
