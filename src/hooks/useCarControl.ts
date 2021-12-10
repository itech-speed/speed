import { useEffect, useRef } from 'react'

export const useKeyPress = (
  target: string[],
  event: (cur: boolean) => void,
) => {
  useEffect(() => {
    const downHandler = ({ key }: any) =>
      target.indexOf(key) !== -1 && event(true)
    const upHandler = ({ key }: any) =>
      target.indexOf(key) !== -1 && event(false)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])
}

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
