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
    value: number | string | boolean,
    propName: keyof Pick<
      MeshStandardMaterialProps,
      'color' | 'opacity' | 'roughness' | 'transparent'
    >,
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
        <div className="text-white mt-5 bg-gray-800 p-2 rounded">
          <Text weight="black">Material</Text>
          <div className="mt-1 bg-gray-600 p-1 rounded">
            <p>Color:</p>
            <HexColorPicker
              className="mx-auto"
              color={selectedObj.material.color as any}
              onChange={(v) => changeObjProp(v, 'color')}
            />
          </div>

          <div className="mt-3 bg-gray-600 p-1 rounded">
            <p>Roughness:</p>

            <input
              type="range"
              value={(selectedObj.material.roughness as any) || 1}
              min={0.0}
              max={1.0}
              step={0.1}
              className="w-full"
              onChange={(e) => changeObjProp(e.target.value, 'roughness')}
            />
          </div>

          <div className="mt-3 bg-gray-600 p-1 rounded">
            <div className="flex items-center space-x-4">
              <p>Transparent:</p>
              <input
                type="checkbox"
                checked={(selectedObj.material.transparent as any) || false}
                onChange={(e) => changeObjProp(e.target.checked, 'transparent')}
              />
            </div>
            <p>Opacity:</p>

            <input
              type="range"
              value={(selectedObj.material.opacity as any) || 1}
              min={0.0}
              max={1.0}
              step={0.1}
              className="w-full"
              onChange={(e) => changeObjProp(e.target.value, 'opacity')}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MaterialMenu
