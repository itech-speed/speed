import { forwardRef } from 'react'
import { IObjectProps } from 'src/types/ObjectProps'

const BoxFiber = forwardRef(
  (
    { material, ...props }: IObjectProps<JSX.IntrinsicElements['mesh']>,
    ref: any,
  ) => {
    return (
      <mesh ref={ref} {...props} castShadow>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" {...material} />
      </mesh>
    )
  },
)

export default BoxFiber
