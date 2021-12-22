// const transformLevelObjToServer = async (objList: any) => {
//   return objList.map((obj: any) => {
//     return {
//       physicType: obj.physicType,
//       objectType: obj.objectType,
//       collideType: obj.collideType,
//       position: !obj.position
//         ? undefined
//         : {
//             x: obj.position[0],
//             y: obj.position[1],
//             z: obj.position[2],
//           },
//       rotation: !obj.rotation
//         ? undefined
//         : {
//             x: obj.rotation[0],
//             y: obj.rotation[1],
//             z: obj.rotation[2],
//           },
//       size: !obj.scale
//         ? undefined
//         : obj.objectType === 'cylinder'
//         ? {
//             x: obj.scale[0],
//             y: obj.scale[2],
//             z: obj.scale[1],
//             segment: 16,
//           }
//         : {
//             x: obj.scale[0],
//             y: obj.scale[1],
//             z: obj.scale[2],
//           },
//     }
//   })
// }

const transformLevelObjToServer = (obj: any) => {
  console.log({ obj })
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
      obj.scale &&
      (obj.objectType === 'cylinder'
        ? {
            x: obj.scale[0],
            y: obj.scale[2],
            z: obj.scale[1],
            segment: 16,
          }
        : {
            x: obj.scale[0],
            y: obj.scale[1],
            z: obj.scale[2],
          }),
  }

  if (!obj.position) delete newObj.position
  if (!obj.rotation) delete newObj.rotation
  if (!obj.scale) delete newObj.size

  delete newObj.scale

  return newObj
}

export default transformLevelObjToServer
