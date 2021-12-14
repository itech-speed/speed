import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from 'src/components/pages/MenuPage'
import ParkinkGamePage from 'src/components/pages/ParkingGame'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ParkinkGamePage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
