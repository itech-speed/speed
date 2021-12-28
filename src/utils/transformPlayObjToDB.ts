const transformPlayObjToDB = (obj: any): any => {
  const newObj = {
    ...obj,
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
    size:
      obj.args &&
      (obj.objectType === 'cylinder'
        ? {
            x: obj.args[0],
            y: obj.args[2],
            z: obj.args[1],
            segment: 16,
          }
        : {
            x: obj.args[0],
            y: obj.args[1],
            z: obj.args[2],
          }),
    physicType: obj.type,
    collideType: obj.userData && obj.userData.id,
  }

  if (!obj.position) delete newObj.position
  if (!obj.rotation) delete newObj.rotation
  if (!obj.args) delete newObj.size
  if (!obj.type) delete newObj.physicType
  if (!obj.userData) delete newObj.collideType
  if (!obj.objectType) delete newObj.objectType
  if (obj.objectType === 'arrow') delete newObj.collideType
  delete newObj.userData
  delete newObj.type
  delete newObj.args

  return newObj
}

export default transformPlayObjToDB
