import { BoxProps, useBox } from '@react-three/cannon'

const Box = ({
  mass = 10,
  args = [1, 1, 1],
  type = 'Static',
  ...props
}: BoxProps) => {
  const [ref] = useBox(() => ({ mass, type, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#818a83" />
    </mesh>
  )
}
export default Box
