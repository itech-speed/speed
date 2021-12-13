/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCylinder } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

useGLTF.preload('/3dmodels/Arrow.glb')

const Arrow = ({ ...props }: any) => {
  const model = useRef()
  const { nodes, materials }: any = useGLTF('/3dmodels/Arrow.glb')
  // true to top, false to bot
  const [direction, setDirection] = useState(true)

  const [ref] = useCylinder(() => ({
    type: 'Static',
    ...props,
  }))

  useFrame(() => {
    if (model.current) {
      // @ts-ignore
      const curY = model.current.position.y
      if (curY > 2) {
        setDirection(false)
      }
      if (curY < -0.1) {
        setDirection(true)
      }
      // @ts-ignore
      model.current.position.y = direction ? curY + 0.05 : curY - 0.05
    }
  })

  return (
    <mesh ref={ref} dispose={null}>
      <group ref={model}>
        <mesh
          scale={[0.3, 0.35, 0.3]}
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.001']}
          position={[0, 0.7, 0]}
          rotation={[Math.PI, 0, 0]}
        />
      </group>
    </mesh>
  )
}
export default Arrow
