import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/reducers/'
import { setNumber } from 'src/reducers/CarReducer'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const number = useSelector((state: RootState) => state.car.num)
  const state = useSelector((state: RootState) => state)

  console.log(state)

  return (
    <div className="App">
      <header className="App-header">
        <p>{number}</p>
        <div>
          <button
            onClick={() => {
              dispatch(setNumber(number + 1))
            }}
          >
            to redaaa
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
