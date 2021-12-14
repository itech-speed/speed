import { Link } from 'react-router-dom'
import H6 from 'src/components/typo/H6'
import { LogoImg } from 'src/res/images'
import { levelsConfigList } from 'src/res/LevelsConfig'
import { HREF_LEVEL } from 'src/res/routes'

const MenuPage = () => {
  return (
    <div>
      <header className="bg-gray-200">
        <div className="pt-2 pb-3 container">
          <div className="flex items-center space-x-2">
            <img src={LogoImg} alt="logo" className="w-8" />
            <H6 className="mt-2">Parking</H6>
          </div>
        </div>
      </header>

      <div className="container mt-5 flex flex-wrap space-x-4">
        {levelsConfigList.map((i) => (
          <LevelCard
            key={i.id}
            path={`/${HREF_LEVEL}/${i.id}`}
            imgLink={i.img}
            title={`Level ${i.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuPage

interface ILevelCardProps {
  path: string
  imgLink: string
  title: string
}

const LevelCard = ({ path, imgLink, title }: ILevelCardProps) => {
  return (
    <Link
      to={path}
      className="block bg-gray-200 text-center p-10 transform transition hover:scale-105"
    >
      <img src={imgLink} alt="" className="h-10 block mx-auto" />

      <H6 className="mt-3" weight="bold">
        {title}
      </H6>
    </Link>
  )
}
