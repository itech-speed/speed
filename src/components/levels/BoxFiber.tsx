import { useRef } from 'react'

const BoxFiber = (props: JSX.IntrinsicElements['mesh']) => {
  const cube = useRef()
  return (
    <mesh ref={cube} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'gray'} />
    </mesh>
  )
}
export default BoxFiber
