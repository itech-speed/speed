import { CylinderProps, useCylinder } from '@react-three/cannon'

const Cylinder = ({ args = [0.7, 0.7, 5, 16], ...props }: CylinderProps) => {
  const [ref] = useCylinder(() => ({
    mass: 10,
    args,
    ...props,
  }))
  return (
    <mesh ref={ref} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color="#4d413f" />
    </mesh>
  )
}

export default Cylinder