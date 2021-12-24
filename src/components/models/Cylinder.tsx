import { CylinderProps, useCylinder } from '@react-three/cannon'
import defaulMaterial from 'src/res/defaultMaterial.json'
import { IObjectProps } from 'src/types/ObjectProps'

const Cylinder = ({
  mass = 10,
  type = 'Static',
  args = [0.7, 0.7, 5, 16],
  material = defaulMaterial,
  ...props
}: IObjectProps<CylinderProps>) => {
  const [ref] = useCylinder(() => ({
    mass,
    type,
    args,
    ...props,
  }))
  return (
    <mesh ref={ref} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial {...material} />
    </mesh>
  )
}

export default Cylinder
