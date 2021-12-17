import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'

useGLTF.preload('/3dmodels/Beetle.glb')

const BeetleFiber = forwardRef(
  (props: JSX.IntrinsicElements['mesh'], ref: any) => {
    const { nodes, materials }: any = useGLTF('/3dmodels/Beetle.glb')

    return (
      <mesh ref={ref} {...props}>
        <group position={[0, -0.6, 0]}>
          <mesh
            castShadow
            material={materials['Black paint']}
            geometry={nodes.chassis_1.geometry}
          />
          <mesh
            castShadow
            material={materials.Rubber}
            geometry={nodes.chassis_2.geometry}
          />
          <mesh
            castShadow
            material={materials.Paint}
            geometry={nodes.chassis_3.geometry}
          />
          <mesh
            castShadow
            material={materials.Underbody}
            geometry={nodes.chassis_4.geometry}
          />
          <mesh
            castShadow
            material={materials.Chrom}
            geometry={nodes.chassis_5.geometry}
          />
          <mesh
            castShadow
            material={materials['Interior (dark)']}
            geometry={nodes.chassis_6.geometry}
          />
          <mesh
            castShadow
            material={materials['Interior (light)']}
            geometry={nodes.chassis_7.geometry}
          />
          <mesh
            castShadow
            material={materials.Reflector}
            geometry={nodes.chassis_8.geometry}
          />
          <mesh
            material={materials.Glass}
            geometry={nodes.chassis_9.geometry}
            material-transparent={false}
            material-color="black"
          />
          <mesh
            castShadow
            material={materials.Steel}
            geometry={nodes.chassis_10.geometry}
          />
          <mesh
            castShadow
            material={materials['Black plastic']}
            geometry={nodes.chassis_11.geometry}
          />
          <mesh
            material={materials.Headlight}
            geometry={nodes.chassis_12.geometry}
          />
          <mesh
            castShadow
            material={materials['Reverse lights']}
            geometry={nodes.chassis_13.geometry}
          />
          <mesh
            castShadow
            material={materials['Orange plastic']}
            geometry={nodes.chassis_14.geometry}
          />
          <mesh
            castShadow
            material={materials['Tail lights']}
            geometry={nodes.chassis_15.geometry}
          />
          <mesh
            castShadow
            material={materials['License Plate']}
            geometry={nodes.chassis_16.geometry}
          />
        </group>
      </mesh>
    )
  },
)

export default BeetleFiber
