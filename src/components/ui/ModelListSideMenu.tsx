import { useState } from 'react'
import { useKeyPress } from 'src/hooks/useKeyPress'
import { BoxImg, CylinderImg } from 'src/res/images'

import H6 from '../typo/H6'

interface IProps {
  className?: string
  onAddObject: (obj: any) => void
}

const ModelListSideMenu = ({ className = '', onAddObject }: IProps) => {
  const [isSideMenu, setSideMenu] = useState(true)

  useKeyPress(['q', 'Q'], (pressed: boolean) => {
    if (pressed) {
      setSideMenu((prev) => !prev)
    }
  })

  return (
    <div className={className}>
      <div className="relative overflow-x-hidden overflow-y-auto w-80 h-screen">
        <div
          className={`${
            isSideMenu ? 'right-0' : '-right-full'
          } ${className} absolute top-0 z-50 transition bg-black bg-opacity-70 w-full h-full`}
        >
          <div className="text-white px-2 py-1">
            <H6 className="mb-4">Primitives:</H6>
            <div className="flex space-x-4">
              <MenuItem
                src={BoxImg}
                onClick={() =>
                  onAddObject({
                    id: Date.now(),
                    objectType: 'box',
                    position: [0, 0.5, 0],
                  })
                }
              />
              <MenuItem
                src={CylinderImg}
                onClick={() =>
                  onAddObject({
                    id: Date.now(),
                    objectType: 'cylinder',
                    position: [0, 0.5, 0],
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelListSideMenu

interface IItemProps {
  src: string
  alt?: string
  onClick: () => void
}

const MenuItem = ({ src, alt = '', onClick }: IItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 transform transition hover:scale-105 select-none"
    >
      <img src={src} alt={alt} className="w-full h-full select-none" />
    </button>
  )
}
