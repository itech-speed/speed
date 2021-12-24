import { useRef } from 'react'

const PlaneFiber = (props: JSX.IntrinsicElements['mesh']) => {
  const plane = useRef()

  return (
    <mesh ref={plane} {...props}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#979fa6" />
    </mesh>
  )
}

export default PlaneFiber
