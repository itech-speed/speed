import { Link } from 'react-router-dom'
import H6 from 'src/components/typo/H6'

interface IProps {
  className?: string
}

const GameMenu = ({ className }: IProps) => {
  return (
    <div className={className}>
      <div className="p-2 bg-black bg-opacity-60 text-white rounded-br-xl">
        <nav className="mb-3">
          <Link to="/menu" onClick={() => console.log('awd')}>
            <H6 className="bg-blue-400  rounded inline-block px-2 py-1 hover:bg-blue-300">
              Menu
            </H6>
          </Link>
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
