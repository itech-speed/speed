import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCompainLevels, getCustomLevels } from 'src/api/requests/getLevels'
import GameMenu from 'src/components/Menu_Game'
import EndGameModal from 'src/components/Modal_EndGame'
import Beetle from 'src/components/models/Beetle'
import LevelBuilder from 'src/components/models/LevelBuilder'
import Plane from 'src/components/models/Plane'
import { PATH_LEVEL } from 'src/res/routes'
import { TEndGameState } from 'src/types/EndGameState'
import transformBDCarToPlay from 'src/utils/transformBDCarToPlay'
import transformDBObjectToPlay from 'src/utils/transformDBObjectToPlay'

import { IDatabaseLevel } from '../../types/DatabaseObject'
import GameContext from '../Context_Game'

const ParkinkGamePage = () => {
  const params = useParams()
  const [currentLevel, setCurrentLevel] = useState<any>(null)

  const { endGameState, setEndGameState } = useContext(GameContext)

  const onGameEnded = (endState: TEndGameState) => {
    setEndGameState(endState)
  }

  const transformCompainLevel = (level: IDatabaseLevel): any => ({
    ...level,
    car: transformBDCarToPlay(level.car),
    objects: level.objects.map((obj) => transformDBObjectToPlay(obj)),
  })

  useEffect(() => {
    const setStartSetup = async () => {
      const levelSlug = params[PATH_LEVEL] || 1
      const compainLevels = await getCompainLevels()
      const findedLevel = compainLevels.find(
        (i) => i.id.toString() === levelSlug.toString(),
      )

      if (findedLevel) setCurrentLevel(transformCompainLevel(findedLevel))
      else {
        const customLevels = await getCustomLevels()
        const findedCustomLevel =
          customLevels &&
          customLevels.find((i) => i.id.toString() === levelSlug.toString())

        if (findedCustomLevel) {
          const newLevel = {
            ...findedCustomLevel,
            car: transformBDCarToPlay(findedCustomLevel.car),
            objects: findedCustomLevel.objects.map((obj) =>
              transformDBObjectToPlay(obj),
            ),
          }

          setCurrentLevel(newLevel)
        } else setCurrentLevel(transformCompainLevel(compainLevels[0]))
      }
    }

    setStartSetup()
  }, [])

  if (!currentLevel) return <div>Loading</div>

  return (
    <main className="h-screen relative">
      <GameMenu className="absolute z-50" />

      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50 }}>
        <color attach="background" args={['#e8fffe']} />
        <ambientLight intensity={0.6} />
        <spotLight
          color="#fffbd1"
          position={[100, 80, 20]}
          angle={0.3}
          intensity={2}
          castShadow
          penumbra={1}
        />

        <Physics
          broadphase="SAP"
          // @ts-ignore
          contactEquationRelaxation={4}
          friction={1e-3}
          allowSleep
        >
          {/* contact groud */}
          <Plane
            type="Static"
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            userData={{ id: 'floor' }}
          />

          <Beetle {...currentLevel.car} onGameEnded={onGameEnded} />

          <LevelBuilder levelData={currentLevel} />
        </Physics>
      </Canvas>

      {endGameState !== null && (
        <EndGameModal className="absolute inset-0" text={endGameState} />
      )}
    </main>
  )
}

export default ParkinkGamePage
