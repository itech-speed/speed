import { useRaycastVehicle, WheelInfoOptions } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { useMoveControls } from 'src/hooks/useCarControl'
import { PerspectiveCamera } from 'three'

import BeetleHull from './BeetleHull'
import BeetleWheel from './BeetleWheel'

function Beetle({
  onGameEnded,
  radius = 0.7,
  width = 1.2,
  height = -0.04,
  front = 1.3,
  back = -1.15,
  steer = 0.75,
  force = 2000,
  maxBrake = 1e5,
  ...props
}: any) {
  const defaultCamera = useThree((state) => state.camera)

  const chassis = useRef(null)
  const wheel1 = useRef(null)
  const wheel2 = useRef(null)
  const wheel3 = useRef(null)
  const wheel4 = useRef(null)
  const controls = useMoveControls()

  const wheelInfo: WheelInfoOptions = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 10,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 2,
  }

  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-width / 2, height, front],
  }
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [width / 2, height, front],
  }
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [-width / 2, height, back],
  }
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [width / 2, height, back],
  }

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: [wheel1, wheel2, wheel3, wheel4],
    wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1,
  }))

  useLayoutEffect(() => {
    if (defaultCamera instanceof PerspectiveCamera) {
      // @ts-ignore
      defaultCamera.zoom = 3
      // defaultCamera.position.set(16, 30, -30)
      defaultCamera.position.set(-1, 30, -30)
      // @ts-ignore
      defaultCamera.lookAt(chassis.current.position)
    }
  }, [defaultCamera])

  useFrame(() => {
    const { forward, backward, left, right, brake, reset } = controls.current
    for (let e = 2; e < 4; e++) {
      api.applyEngineForce(
        forward || backward ? force * (forward && !backward ? -1 : 1) : 0,
        2,
      )
    }
    for (let s = 0; s < 2; s++)
      api.setSteeringValue(
        left || right ? steer * (left && !right ? 1 : -1) : 0,
        s,
      )
    for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b)
    if (reset && chassis.current) {
      // @ts-ignore
      chassis.current.api.position.set(
        props.position[0],
        props.position[1],
        props.position[2],
      )

      // @ts-ignore
      chassis.current.api.velocity.set(0, 0, 0)
      // @ts-ignore
      chassis.current.api.angularVelocity.set(0, 1, 0)
      // @ts-ignore
      chassis.current.api.rotation.set(0, 0.13, 0)
      // chassis.current.api.rotation.set(0, -Math.PI / 4, 0)
    }
  })

  return (
    <>
      <group ref={vehicle} position={[0, -0.43, 0]}>
        <BeetleHull
          ref={chassis}
          //@ts-ignore
          onGameEnded={onGameEnded}
          rotation={props.rotation}
          position={props.position}
          angularVelocity={props.angularVelocity}
        />

        <BeetleWheel ref={wheel1} radius={radius} leftSide />
        <BeetleWheel ref={wheel2} radius={radius} />
        <BeetleWheel ref={wheel3} radius={radius} leftSide />
        <BeetleWheel ref={wheel4} radius={radius} />
      </group>

      {/*<OrbitControls screenSpacePanning={false} target={[-10, 1, -10]} />*/}
    </>
  )
}

export default Beetle