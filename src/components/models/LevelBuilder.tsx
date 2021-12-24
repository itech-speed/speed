import { ILevelConfig } from 'src/types/LevelConfig'
import { getObjectComponent } from 'src/utils/getObjectComponent'

interface IProps {
  levelData: ILevelConfig
}

const LevelBuilder = ({ levelData }: IProps) => {
  return (
    <>
      {levelData.objects.map(({ objectType, ...props }, id) => {
        const Component = getObjectComponent(objectType)
        return <Component key={id} {...props} />
      })}
    </>
  )
}

export default LevelBuilder
