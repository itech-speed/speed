import { forwardRef } from 'react'

const BoxFiber = forwardRef(
  (props: JSX.IntrinsicElements['mesh'], ref: any) => {
    return (
      <mesh ref={ref} {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>
    )
  },
)
export default BoxFiber
