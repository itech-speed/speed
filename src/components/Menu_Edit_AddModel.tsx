import Text from 'src/components/Text'
import defaultMaterial from 'src/res/defaultMaterial.json'
import { BoxImg, CylinderImg } from 'src/res/images'
import { USERDATA_WALL } from 'src/res/userDataName'

const basicObjectProps = {
  position: [0, 0.5, 0],
  physicType: 'Static',
  collideType: USERDATA_WALL,
  castShadow: true,
  material: defaultMaterial,
}

interface IProps {
  onAddObject: (obj: any) => void
}

const AddModelMenu = ({ onAddObject }: IProps) => {
  return (
    <div className="text-white bg-gray-800 p-2 rounded">
      <Text weight="black">Primitives:</Text>
      <div className="flex space-x-4 mt-3 bg-gray-600 p-1 rounded">
        <MenuItem
          src={BoxImg}
          onClick={() =>
            onAddObject({
              ...basicObjectProps,
              id: Date.now(),
              objectType: 'box',
            })
          }
        />
        <MenuItem
          src={CylinderImg}
          onClick={() =>
            onAddObject({
              ...basicObjectProps,
              id: Date.now(),
              objectType: 'cylinder',
            })
          }
        />
      </div>
    </div>
  )
}

export default AddModelMenu

interface IItemProps {
  src: string
  alt?: string
  onClick: () => void
}

const MenuItem = ({ src, alt = '', onClick }: IItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 transform transition hover:scale-105 select-none"
    >
      <img src={src} alt={alt} className="w-full h-full select-none" />
    </button>
  )
}
