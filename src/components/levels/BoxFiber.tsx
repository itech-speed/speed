import { forwardRef } from 'react'
import { IObjectProps } from 'src/types/ObjectProps'

const BoxFiber = forwardRef(
  ({ material, ...props }: IObjectProps, ref: any) => {
    return (
      <mesh ref={ref} {...props} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...material} />
      </mesh>
    )
  },
)

export default BoxFiber
