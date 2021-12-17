import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

useGLTF.preload('/3dmodels/Arrow.glb')

const ArrowFiber = (props: JSX.IntrinsicElements['mesh']) => {
  const ref = useRef()
  const arrow = useRef()
  const { nodes, materials }: any = useGLTF('/3dmodels/Arrow.glb')
  // true to top, false to bottom
  const [direction, setDirection] = useState(true)

  useFrame(() => {
    if (arrow.current) {
      // @ts-ignore
      const curY = arrow.current.position.y
      if (curY > 2) {
        setDirection(false)
      }
      if (curY < -0.1) {
        setDirection(true)
      }
      // @ts-ignore
      arrow.current.position.y = direction ? curY + 0.03 : curY - 0.03
    }
  })

  return (
    <mesh ref={ref} {...props}>
      <group ref={arrow}>
        <mesh
          scale={[0.3, 0.35, 0.3]}
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.001']}
          position={[0, 1.5, 0]}
          rotation={[Math.PI, 0, 0]}
        />
      </group>
    </mesh>
  )
}
export default ArrowFiber
