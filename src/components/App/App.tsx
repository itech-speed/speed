import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from 'src/components/pages/MenuPage'
import ParkinkGamePage from 'src/components/pages/ParkingGame'
import { HREF_LEVEL, HREF_MENU, SLUG_LEVEL } from 'src/res/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ParkinkGamePage />} />
        <Route path={`/${HREF_MENU}`} element={<MenuPage />} />

        <Route
          path={`/${HREF_LEVEL}/:${SLUG_LEVEL}`}
          element={<ParkinkGamePage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
