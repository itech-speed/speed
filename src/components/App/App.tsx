import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
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

import { db } from '../../config/firebase'

const App = () => {
  const [objectTypes, setObjectTypes] = useState([])
  const [levels, setLevels] = useState([])

  const objectTypesCollectionRef = collection(db, 'object_types')
  const levelsCollectionRef = collection(db, 'levels')

  const getLevels = async () => {
    const data = await getDocs(levelsCollectionRef)
    // @ts-ignore
    setLevels(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  const getObjectTypes = async () => {
    const data = await getDocs(objectTypesCollectionRef)
    // @ts-ignore
    setObjectTypes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  const createLevel = async () => {
    await addDoc(levelsCollectionRef, {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      objects: [
        {
          // @ts-ignore
          objectTypeID: doc(db, `object_types/${objectTypes[0].id}`),
        },
      ],
    })
  }

  useEffect(() => {
    getObjectTypes()
    getLevels()
    // createLevel()
  }, [])

  console.log({ objectTypes })
  console.log({ levels })

  return (
    <BrowserRouter>
      <button onClick={createLevel}>Create</button>
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
