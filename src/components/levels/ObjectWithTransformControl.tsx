import { TransformControls } from '@react-three/drei'
import { Euler, Vector3 } from '@react-three/fiber'
import { useRef } from 'react'
import { EditMode } from 'src/types/EditMode'
import { TObjectTypes } from 'src/types/ObjectTypes'
import { getObjectComponent } from 'src/utils/getObjectComponent'

interface IProps {
  editMode: EditMode
  selectedObjId: string | null
  id: string
  onClick: (id: string) => void
  onEdit: (object: any) => void
  position?: Vector3
  rotation?: Euler
  scale?: Vector3
  objectType: TObjectTypes
}

const ObjectWithTransformControl = ({
  editMode,
  selectedObjId,
  id,
  onClick,
  onEdit,
  position,
  rotation,
  scale,
  objectType,
}: IProps) => {
  const Component = getObjectComponent(objectType, true)
  const ref = useRef()

  return (
    <TransformControls
      showZ={selectedObjId === id}
      showY={selectedObjId === id}
      showX={selectedObjId === id}
      enabled={selectedObjId === id}
      onClick={() => onClick(id)}
      onMouseUp={() => {
        // @ts-ignore
        const pos = ref.current.parent.position
        // @ts-ignore
        const rot = ref.current.parent.rotation
        // @ts-ignore
        const scale = ref.current.parent.scale
        onEdit({
          id,
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
