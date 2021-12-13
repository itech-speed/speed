import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'
import { USERDATA_ARROW, USERDATA_WALL } from 'src/res/userDataName'

useGLTF.preload('/3dmodels/Beetle.glb')

// Auto-generated by: https://github.com/pmndrs/gltfjsx
const BeetleHull = forwardRef(
  ({ onGameEnded, args = [1.7, 1, 4], mass = 500, ...props }: any, ref) => {
    const { nodes, materials }: any = useGLTF('/3dmodels/Beetle.glb')
    const [, api] = useBox(
      () => ({
        mass,
        args,
        allowSleep: false,
        onCollide: (e) => {
          if (e.body.userData.id === USERDATA_ARROW) {
            onGameEnded('victory')
          } else if (e.body.userData.id === USERDATA_WALL) {
            onGameEnded('defeat')
          }
        },
        ...props,
      }),
      ref,
    )

    return (
      <mesh ref={ref} api={api}>
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
            castShad6
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

export default BeetleHull
