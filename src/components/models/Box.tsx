import { BoxProps, useBox } from '@react-three/cannon'
import defaulMaterial from 'src/res/defaultMaterial.json'
import { IObjectProps } from 'src/types/ObjectProps'

const Box = ({
  mass = 10,
  args = [1, 1, 1],
  type = 'Static',
  material = defaulMaterial,
  ...props
}: IObjectProps<BoxProps>) => {
  const [ref] = useBox(() => ({ mass, type, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial {...material} />
    </mesh>
  )
}
export default Box
