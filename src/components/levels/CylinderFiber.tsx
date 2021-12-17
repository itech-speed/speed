import { useRef } from 'react'

const CylinderFiber = (props: JSX.IntrinsicElements['mesh']) => {
  const cylinder = useRef()
  return (
    <mesh ref={cylinder} {...props}>
      <cylinderGeometry args={[1, 1, 1, 16]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  )
}

export default CylinderFiber
