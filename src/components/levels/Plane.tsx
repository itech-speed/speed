import { PlaneProps, usePlane } from '@react-three/cannon'

const Plane = (props: PlaneProps) => {
  const [ref] = usePlane(() => ({
    material: 'ground',
    ...props,
  }))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#3b663d" />
      </mesh>
    </group>
  )
}

export default Plane
