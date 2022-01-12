import { TransformControls } from '@react-three/drei'
import { useRef } from 'react'
import { IEditableObject } from 'src/types/EditableObject'
import { EditMode } from 'src/types/EditMode'
import { getObjectComponent } from 'src/utils/getObjectComponent'
import * as THREE from 'three'

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
  const ref = useRef<THREE.Mesh>()

  return (
    <TransformControls
      showZ={selectedObj?.id === id}
      showY={selectedObj?.id === id}
      showX={selectedObj?.id === id}
      enabled={selectedObj?.id === id}
      onClick={(e) => {
        e.stopPropagation()
        onClick(obj)
      }}
      onMouseUp={() => {
        if (ref.current && ref.current.parent) {
          const pos = ref.current.parent.position
          const rot = ref.current.parent.rotation
          const scale = ref.current.parent.scale
          onEdit({
            ...obj,
            position: [pos.x, pos.y, pos.z],
            rotation: [rot.x, rot.y, rot.z],
            scale: [scale.x, scale.y, scale.z],
          })
        }
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
      <Component
        ref={ref}
        castShadow={obj.castShadow}
        material={obj.material}
      />
    </TransformControls>
  )
}

export default ObjectWithTransformControl
