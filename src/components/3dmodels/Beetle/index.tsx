import { useRaycastVehicle } from '@react-three/cannon'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useMoveControls } from 'src/hooks/useCarControl'

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
  const chassis = useRef()
  const wheel1 = useRef()
  const wheel2 = useRef()
  const wheel3 = useRef()
  const wheel4 = useRef()
  const controls = useMoveControls()

  const camera = useRef()

  const wheelInfo = {
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

  const wheelInfo1 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-width / 2, height, front],
  }
  const wheelInfo2 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [width / 2, height, front],
  }
  const wheelInfo3 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [-width / 2, height, back],
  }
  const wheelInfo4 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [width / 2, height, back],
  }

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: [wheel1, wheel2, wheel3, wheel4],
    // @ts-ignore
    wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1,
  }))

  useFrame(() => {
    console.log(camera.current)

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
    if (reset) {
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
      {/* 
      @ts-ignore */}
      <PerspectiveCamera
        ref={camera}
        position={[4.16, 19, -3.75]}
        rotation={[-1.245, 0.405, 0.863]}
        near={0.01}
        far={500}
        makeDefault
      />
      {/* 
      @ts-ignore */}
      <OrbitControls screenSpacePanning={false} />
    </>
  )
}

export default Beetle
