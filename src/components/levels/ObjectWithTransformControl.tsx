import { TransformControls } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import BoxFiber from 'src/components/levels/BoxFiber'
import { EditMode } from 'src/types/EditMode'
import { TObjectTypes } from 'src/types/ObjectTypes'

interface IProps {
  editMode: EditMode
  selectedObjId: string | null
  id: string
  onClick: (id: string) => void
  position?: Vector3
  objectType: TObjectTypes
}

const ObjectWithTransformControl = ({
  editMode,
  selectedObjId,
  id,
  onClick,
  position,
  objectType,
}: IProps) => {
  console.log(objectType)

  return (
    <TransformControls
      showZ={selectedObjId === id}
      showY={selectedObjId === id}
      showX={selectedObjId === id}
      enabled={selectedObjId === id}
      onClick={() => onClick(id)}
      mode={editMode}
      position={position}
      scaleSnap={0.5}
      translationSnap={0.5}
      rotationSnap={0.261799}
      space="local"
      size={0.7}
    >
      <BoxFiber castShadow />
    </TransformControls>
  )
}

export default ObjectWithTransformControl
