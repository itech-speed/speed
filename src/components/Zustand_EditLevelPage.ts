import defaultObjs from 'src/res/defaultEditObj.json'
import { IEditableObject } from 'src/types/EditableObject'
import create from 'zustand'

interface IStore {
  objects: IEditableObject[]
  api: {
    setObjects: (objects: IEditableObject[]) => void
    addObject: (object: IEditableObject) => void
    deleteObject: (id: string) => void
    editObject: (object: IEditableObject) => void
  }
}

export const useStore = create<IStore>((set, get) => ({
  objects: defaultObjs as IEditableObject[],
  api: {
    setObjects(objects) {
      set((state) => ({ ...state, objects }))
    },
    addObject(object) {
      set((state) => ({ ...state, objects: [...state.objects, object] }))
    },
    deleteObject(id) {
      const objects = get().objects
      const index = objects.findIndex((obj) => obj.id === id)
      if (index >= 0) {
        const updatedList = [
          ...objects.slice(0, index),
          ...objects.slice(index + 1),
        ]
        set((state) => ({ ...state, objects: updatedList }))
      }
    },
    editObject(object) {
      const objects = get().objects
      const index = objects.findIndex((obj) => obj.id === object.id)
      const updatedObject = {
        ...objects[index],
        ...object,
      }
      if (index >= 0) {
        const updatedList = [
          ...objects.slice(0, index),
          updatedObject,
          ...objects.slice(index + 1),
        ]

        set((state) => ({ ...state, objects: updatedList }))
      }
    },
  },
}))
