import { MeshStandardMaterialProps } from '@react-three/fiber'
import { HexColorPicker } from 'react-colorful'
import Text from 'src/components/Text'
import { IEditableObject } from 'src/types/EditableObject'

interface IProps {
  selectedObj: IEditableObject | null
  onEditObject: (obj: IEditableObject) => void
}

const MaterialMenu = ({ selectedObj, onEditObject }: IProps) => {
  const changeObjProp = (
    value: string,
    propName: keyof Pick<MeshStandardMaterialProps, 'color'>,
  ) => {
    if (selectedObj) {
      onEditObject({
        ...selectedObj,
        material: {
          ...selectedObj.material,
          [propName]: value,
        },
      })
    }
  }

  return (
    <>
      {selectedObj && selectedObj.material && (
        <div className="text-white mt-5">
          <Text weight="black">Material</Text>
          <div className="mt-1">
            <p>Color:</p>
            <HexColorPicker
              color={selectedObj.material.color as any}
              onChange={(v) => changeObjProp(v, 'color')}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MaterialMenu
