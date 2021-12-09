import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/reducers/'
import { setColor } from 'src/reducers/CarReducer'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const color = useSelector((state: RootState) => state.car.color)

  console.log(color)

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ color: color }}>{color}</p>
        <div>
          <button
            onClick={() => {
              console.log(color)
              dispatch(setColor)
            }}
          >
            to red
          </button>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
