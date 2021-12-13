import Arrow from './Arrow'
import Box from './Box'
import Cylinder from './Cylinder'

const LevelBuilder = ({ levelData }: any) => {
  return (
    <>
      {levelData.objects.map((i: any, id: number) => {
        const Component =
          i.objectType === 'box'
            ? Box
            : i.objectType === 'cylinder'
            ? Cylinder
            : Arrow
        return <Component key={id} {...i} />
      })}
    </>
  )
}

export default LevelBuilder
