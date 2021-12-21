import { TransformControls } from '@react-three/drei'
import { useRef } from 'react'
import { IEditableObject } from 'src/types/EditableObject'
import { EditMode } from 'src/types/EditMode'
import { getObjectComponent } from 'src/utils/getObjectComponent'

interface IProps {
  obj: IEditableObject
  editMode: EditMode
  selectedObj: IEditableObject | null
  onClick: (obj: IEditableObject) => void
  onEdit: (obj: IEditableObject) => void
}

const ObjectWithTransformControl = ({
  editMode,
  obj,
  selectedObj,
  onClick,
  onEdit,
}: IProps) => {
  const { id, position, rotation, scale, objectType } = obj
  const Component = getObjectComponent(objectType, true)
  const ref = useRef()

  return (
    <TransformControls
      showZ={selectedObj?.id === id}
      showY={selectedObj?.id === id}
      showX={selectedObj?.id === id}
      enabled={selectedObj?.id === id}
      onClick={() => onClick(obj)}
      onMouseUp={() => {
        // @ts-ignore
        const pos = ref.current.parent.position
        // @ts-ignore
        const rot = ref.current.parent.rotation
        // @ts-ignore
        const scale = ref.current.parent.scale
        onEdit({
          ...obj,
          position: [pos.x, pos.y, pos.z],
          rotation: [rot.x, rot.y, rot.z],
          scale: [scale.x, scale.y, scale.z],
        })
      }}
      mode={editMode}
      position={position}
      rotation={rotation}
      scale={scale}
      scaleSnap={0.5}
      translationSnap={0.5}
      rotationSnap={0.261799}
      space="local"
      size={0.7}
    >
      <Component ref={ref} castShadow />
    </TransformControls>
  )
}

export default ObjectWithTransformControl
