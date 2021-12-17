import { Link } from 'react-router-dom'
import H6 from 'src/components/typo/H6'
import { AddImg, LogoImg } from 'src/res/images'
import { levelsConfigList } from 'src/res/LevelsConfig'
import { CUSTOM_LEVELS } from 'src/res/localStorageNames'
import { HREF_LEVEL, PATH_LEVEL_CREATE } from 'src/res/routes'

const MenuPage = () => {
  const isCustomLevels = localStorage.getItem(CUSTOM_LEVELS)
  const customLevel = isCustomLevels ? JSON.parse(isCustomLevels) : null

  console.log(customLevel)

  return (
    <>
      <header className="bg-gray-200">
        <div className="pt-2 pb-3 container">
          <div className="flex items-center space-x-2">
            <img src={LogoImg} alt="logo" className="w-8" />
            <H6 className="mt-2">Parking</H6>
          </div>
        </div>
      </header>

      <main className="container mt-5">
        <H6>Compain levels:</H6>
        <div className="mt-2 flex flex-wrap space-x-4">
          {levelsConfigList.map((i) => (
            <LevelCard
              key={i.id}
              path={`/${HREF_LEVEL}/${i.id}`}
              imgLink={i.img}
              title={`Level ${i.id}`}
            />
          ))}
        </div>

        <H6 className="mt-5">Custom levels:</H6>
        <div className="mt-2 flex flex-wrap space-x-4">
          {customLevel &&
            customLevel.map((i: any) => (
              <LevelCard
                key={i.id}
                path={`/${HREF_LEVEL}/${i.id}`}
                imgLink={i.img}
                title={`Level ${i.id}`}
              />
            ))}
          <LevelCard
            path={`/${HREF_LEVEL}/${PATH_LEVEL_CREATE}`}
            imgLink={AddImg}
            title={`Create level`}
          />
        </div>
      </main>
    </>
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
      className="block bg-gray-200 text-center p-2 w-40 h-44 transform transition hover:scale-105"
    >
      <div className="flex flex-col justify-center items-center h-full">
        <img src={imgLink} alt="" className="h-10 block mx-auto" />

        <H6 className="my-3" weight="bold">
          {title}
        </H6>
      </div>
    </Link>
  )
}
