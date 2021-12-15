import { ILevelConfig } from 'src/types/LevelConfig'

import Arrow from './Arrow'
import Box from './Box'
import Cylinder from './Cylinder'

interface IProps {
  levelData: ILevelConfig
}

const LevelBuilder = ({ levelData }: IProps) => {
  return (
    <>
      {levelData.objects.map(({ objectType, ...props }, id) => {
        const Component: any =
          objectType === 'box'
            ? Box
            : objectType === 'cylinder'
            ? Cylinder
            : Arrow
        return <Component key={id} {...props} />
      })}
    </>
  )
}

export default LevelBuilder
