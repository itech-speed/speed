import { HREF_MENU } from 'src/res/routes'

import Button from '../buttons/Button'
import H6 from '../typo/H6'

interface IProps {
  className?: string
  editInfo?: boolean
}

const GameMenu = ({ className, editInfo }: IProps) => {
  return (
    <div className={className}>
      <div className="p-2 bg-black bg-opacity-60 text-white">
        <Button className="mb-3" link={`/${HREF_MENU}`}>
          <H6>Menu</H6>
        </Button>

        {editInfo ? (
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
        ) : (
          <pre>
            Turn on ENLISH Lang
            <br />
            W - Move objects
            <br />
            E - Rotate objects
            <br />R - Scale objects
            <br />
            Delete - remove selected object
            <br />
            CAMERA:
            <br />
            Rotate camera - hold LCM
            <br />
            Shift camera - Shift + hold LCM
          </pre>
        )}
      </div>
    </div>
  )
}

export default GameMenu
