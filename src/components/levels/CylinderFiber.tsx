import { forwardRef } from 'react'
import { IObjectProps } from 'src/types/ObjectProps'

const CylinderFiber = forwardRef(
  ({ material, ...props }: IObjectProps, ref: any) => {
    return (
      <mesh ref={ref} {...props}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial {...material} />
      </mesh>
    )
  },
)

export default CylinderFiber
