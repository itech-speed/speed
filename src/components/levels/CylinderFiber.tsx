import { forwardRef } from 'react'

const CylinderFiber = forwardRef(
  (props: JSX.IntrinsicElements['mesh'], ref: any) => {
    return (
      <mesh ref={ref} {...props}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    )
  },
)

export default CylinderFiber
