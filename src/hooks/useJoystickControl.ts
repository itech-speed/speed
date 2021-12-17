import nipplejs from 'nipplejs'
import { useRef } from 'react'

const options = {
  size: 120,
  maxNumberOfNipples: 2,
  mode: 'static',
  restJoystick: true,
  shape: 'circle',
  position: { bottom: '100px', left: '100px' },
  dynamicPage: true,
}

// @ts-ignore
const manager = nipplejs.create(options)

export interface IJoystickKeysProps {
  joystickForward: boolean
  joystickBackward: boolean
  joystickLeft: boolean
  joystickRight: boolean
}

export const useJoystickControls = () => {
  const keys = useRef<IJoystickKeysProps>({
    joystickForward: false,
    joystickBackward: false,
    joystickLeft: false,
    joystickRight: false,
  })

  // @ts-ignore
  manager[0].on('move', (evt, data) => {
    const forward = data.vector.y
    const turn = data.vector.x

    if (forward > 0) {
      keys.current.joystickForward = true
      keys.current.joystickBackward = false
    } else if (forward < 0) {
      keys.current.joystickForward = false
      keys.current.joystickBackward = true
    }

    if (turn > 0) {
      keys.current.joystickRight = true
      keys.current.joystickLeft = false
    } else if (turn < 0) {
      keys.current.joystickRight = false
      keys.current.joystickLeft = true
    }
  })

  // @ts-ignore
  manager[0].on('end', (evt) => {
    keys.current.joystickForward = false
    keys.current.joystickBackward = false
    keys.current.joystickLeft = false
    keys.current.joystickRight = false
  })

  return keys
}
