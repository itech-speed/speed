import { USERDATA_WALL } from '../res/userDataName'

const transformServerObjectToPlay = (obj: any): any => {
  const newObj = {
    id: obj.id,
    uid: obj.uid,
    objectType: obj.objectType,
    position: obj.position && [obj.position.x, obj.position.y, obj.position.z],
    rotation: obj.rotation && [obj.rotation.x, obj.rotation.y, obj.rotation.z],
    args:
      obj.size &&
      (obj.objectType === 'cylinder'
        ? [obj.size.x, obj.size.z, obj.size.y]
        : [obj.size.x, obj.size.y, obj.size.z]),
    type: obj.physicType || 'Static',
    userData: {
      id: obj.id === 'arrow' ? 'arrow' : obj.collideType || USERDATA_WALL,
    },
  }

  return newObj
}

export default transformServerObjectToPlay
