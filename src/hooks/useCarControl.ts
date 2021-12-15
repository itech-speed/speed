import { useRef } from 'react'

import { useKeyPress } from './useKeyPress'

export interface IKeysProps {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  brake: boolean
  reset: boolean
}
export const useMoveControls = () => {
  const keys = useRef<IKeysProps>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
    reset: false,
  })
  useKeyPress(
    ['ArrowUp', 'w'],
    (pressed: boolean) => (keys.current.forward = pressed),
  )
  useKeyPress(
    ['ArrowDown', 's'],
    (pressed: boolean) => (keys.current.backward = pressed),
  )
  useKeyPress(
    ['ArrowLeft', 'a'],
    (pressed: boolean) => (keys.current.left = pressed),
  )
  useKeyPress(
    ['ArrowRight', 'd'],
    (pressed: boolean) => (keys.current.right = pressed),
  )
  useKeyPress([' '], (pressed: boolean) => (keys.current.brake = pressed))
  useKeyPress(['r'], (pressed: boolean) => (keys.current.reset = pressed))
  return keys
}
