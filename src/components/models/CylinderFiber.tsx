import { forwardRef } from 'react'
import { IObjectProps } from 'src/types/ObjectProps'

const CylinderFiber = forwardRef(
  (
    { material, ...props }: IObjectProps<JSX.IntrinsicElements['mesh']>,
    ref: any,
  ) => {
    return (
      <mesh ref={ref} {...props}>
        <cylinderGeometry attach="geometry" args={[1, 1, 1, 16]} />
        <meshStandardMaterial attach="material" {...material} />
      </mesh>
    )
  },
)

export default CylinderFiber
