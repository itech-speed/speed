import { getCollideTypes, getObjectTypes } from '../api/get'

const getObjectTypeID = async (title: string) => {
  const objectTypes = await getObjectTypes()

  // @ts-ignore
  return objectTypes.find((objType) => objType.title == title)?.id
}

const getCollideTypeID = async (title: string) => {
  const collideTypes = await getCollideTypes()

  // @ts-ignore
  return collideTypes.find((collideType) => collideType.title == title)?.id
}

export { getCollideTypeID, getObjectTypeID }
