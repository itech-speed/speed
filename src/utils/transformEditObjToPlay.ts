import { IEditableObject } from 'src/types/EditableObject'

const transformEditObjToPlay = (obj: IEditableObject): any => {
  const newObj = {
    ...obj,
    args:
      obj.scale &&
      (obj.objectType === 'cylinder'
        ? // @ts-ignore
          [obj.scale[0], obj.scale[2], obj.scale[1], 16]
        : obj.scale),
    type: 'Static',
    userData: { id: obj.id === 'arrow' ? 'arrow' : 'wall' },
  }

  delete newObj.scale

  return newObj
}

export default transformEditObjToPlay
