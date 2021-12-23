import { forwardRef } from 'react'
import { IObjectProps } from 'src/types/ObjectProps'

const BoxFiber = forwardRef(
  ({ meshProps, materialProps }: IObjectProps, ref: any) => {
    return (
      <mesh ref={ref} {...meshProps} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    )
  },
)

export default BoxFiber
