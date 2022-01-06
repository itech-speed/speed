import { forwardRef } from 'react'
import { IObjectProps } from 'src/types/ObjectProps'

const BoxFiber = forwardRef(
  (
    {
      material,
      castShadow = true,
      ...props
    }: IObjectProps<JSX.IntrinsicElements['mesh']>,
    ref: any,
  ) => {
    return (
      <mesh ref={ref} castShadow={castShadow} {...props}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" {...material} />
      </mesh>
    )
  },
)

export default BoxFiber
