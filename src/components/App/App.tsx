import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ParkinkGamePage from 'src/components/pages/ParkinkGame'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ParkinkGamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
