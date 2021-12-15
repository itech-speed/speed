import { HREF_MENU } from 'src/res/routes'

import Button from '../buttons/Button'
import H6 from '../typo/H6'

interface IProps {
  className?: string
}

const GameMenu = ({ className }: IProps) => {
  return (
    <div className={className}>
      <div className="p-2 bg-black bg-opacity-60 text-white">
        <nav className="mb-3">
          <Button link={`/${HREF_MENU}`}>
            <H6>Menu</H6>
          </Button>
        </nav>

        <pre>
          Must run on descktop and fullscreen!
          <br />
          WASD to drive, space to brake
          <br />
          Rotate camera - hold LCM
          <br />
          Shift camera - Shift + hold LCM
          <br />R to reset
        </pre>
      </div>
    </div>
  )
}

export default GameMenu
