import { useState } from 'react'
import { Link } from 'react-router-dom'
import H6 from 'src/components/typo/H6'
import { AddImg, DeleteImg, EditImg, LogoImg } from 'src/res/images'
import { levelsConfigList } from 'src/res/LevelsConfig'
import { CUSTOM_LEVELS } from 'src/res/localStorageNames'
import { HREF_LEVEL, PATH_LEVEL_CREATE } from 'src/res/routes'

const MenuPage = () => {
  const isCustomLevels = localStorage.getItem(CUSTOM_LEVELS)
  const [customLevels, setCustomLevels] = useState(
    isCustomLevels ? JSON.parse(isCustomLevels) : null,
  )

  const onDelete = (id: string) => {
    const isLevels = localStorage.getItem(CUSTOM_LEVELS)
    const levels = isLevels ? JSON.parse(isLevels) : null
    const index = levels.findIndex((obj: any) => obj.id === id)
    if (index >= 0) {
      const updatedList = [
        ...levels.slice(0, index),
        ...levels.slice(index + 1),
      ]
      setCustomLevels(updatedList)
      localStorage.setItem(CUSTOM_LEVELS, JSON.stringify(updatedList))
    }
  }

  const onEdit = (id: string) => {
    //
  }

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
          {customLevels &&
            customLevels.map((i: any) => (
              <LevelCard
                key={i.id}
                path={`/${HREF_LEVEL}/${i.id}`}
                imgLink={i.img}
                title={`Level ${i.id}`}
                onDelete={() => onDelete(i.id)}
                onEdit={() => onEdit(i.id)}
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
  onDelete?: () => void
  onEdit?: () => void
}

const LevelCard = ({
  path,
  imgLink,
  title,
  onDelete,
  onEdit,
}: ILevelCardProps) => {
  return (
    <div className="relative transform transition group hover:scale-105">
      <div className="absolute top-1 right-1 z-50 flex">
        {onDelete && (
          <button
            className="p-2 rounded-sm bg-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-300"
            onClick={onDelete}
          >
            <img src={DeleteImg} className="w-3 h-3" />
          </button>
        )}
        {onEdit && (
          <button
            className="p-2 rounded-sm bg-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-300"
            onClick={onEdit}
          >
            <img src={EditImg} className="w-3 h-3" />
          </button>
        )}
      </div>
      <Link to={path} className="block bg-gray-200 text-center p-2 w-40 h-44">
        <div className="flex flex-col justify-center items-center h-full relative">
          <img src={imgLink} alt="" className="h-10 block mx-auto" />

          <H6 className="my-3" weight="bold">
            {title}
          </H6>
        </div>
      </Link>
    </div>
  )
}
