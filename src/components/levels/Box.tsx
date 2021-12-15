import { BoxProps, useBox } from '@react-three/cannon'

const Box = ({ args = [40, 4, 2], type = 'Static', ...props }: BoxProps) => {
  const [ref] = useBox(() => ({ type, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#818a83" />
    </mesh>
  )
}
export default Box
