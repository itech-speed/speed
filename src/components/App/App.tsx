import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditLevelPage from 'src/components/pages/EditLevelPage'
import MenuPage from 'src/components/pages/MenuPage'
import ParkinkGamePage from 'src/components/pages/ParkingGame'
import {
  HREF_LEVEL,
  HREF_MENU,
  PATH_LEVEL,
  PATH_LEVEL_CREATE,
} from 'src/res/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ParkinkGamePage />} />
        <Route path={`/${HREF_MENU}`} element={<MenuPage />} />

        <Route path={HREF_LEVEL}>
          <Route path={`:${PATH_LEVEL}`} element={<ParkinkGamePage />} />
          <Route path={PATH_LEVEL_CREATE} element={<EditLevelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
