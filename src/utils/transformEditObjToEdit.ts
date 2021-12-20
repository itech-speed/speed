const transformEditObjToEdit = (obj: any): any => {
  const newObj = {
    ...obj,
    scale:
      obj.args &&
      (obj.objectType === 'cylinder'
        ? [obj.args[0], obj.args[2], obj.args[1]]
        : [obj.args[0], obj.args[1], obj.args[2]]),
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
