import { useState } from 'react'
import { useKeyPress } from 'src/hooks/useKeyPress'

interface IProps {
  className?: string
}

const ModelListSideMenu = ({ className = '' }: IProps) => {
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
          } ${className} absolute top-0 z-50 transition-all bg-black bg-opacity-70 w-full h-full`}
        >
          asdaaaaaaaaaa
        </div>
      </div>
    </div>
  )
}

export default ModelListSideMenu
