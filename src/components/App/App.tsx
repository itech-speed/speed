import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from 'src/components/pages/MenuPage'
import ParkinkGamePage from 'src/components/pages/ParkingGame'
import { withSuspence } from 'src/hoc/withSuspence'
import {
  HREF_LEVEL,
  HREF_MENU,
  PATH_LEVEL,
  PATH_LEVEL_CREATE,
} from 'src/res/routes'

const EditLevelPage = withSuspence(
  lazy(() => import('src/components/pages/EditLevelPage')),
)

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
