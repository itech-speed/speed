import { useState } from 'react'
import Button from 'src/components/Button'
import { useKeyPress } from 'src/hooks/useKeyPress'
import { IEditableObject } from 'src/types/EditableObject'

import AddModelMenu from './Menu_Edit_AddModel'
import MaterialMenu from './Menu_Edit_Material'
import SetTypesMenu from './Menu_Edit_SetTypes'

interface IProps {
  className?: string
  onAddObject: (obj: any) => void
  onSave: () => void
  selectedObj: IEditableObject | null
  onEditObject: (obj: IEditableObject) => void
}

const EditMenu = ({
  className = '',
  onAddObject,
  onSave,
  selectedObj,
  onEditObject,
}: IProps) => {
  const [isSideMenu, setSideMenu] = useState(true)

  useKeyPress(['q', 'Q'], (pressed: boolean) => {
    if (pressed) {
      setSideMenu((prev) => !prev)
    }
  })

  return (
    <div className={className}>
      <div
        className={`bg-black bg-opacity-70 overflow-x-hidden overflow-y-auto transition-all h-screen ${
          isSideMenu ? 'w-80' : 'w-0'
        } px-2 py-1`}
      >
        <Button className="my-5 w-full" onClick={onSave}>
          Save
        </Button>

        <AddModelMenu onAddObject={onAddObject} />
        <SetTypesMenu selectedObj={selectedObj} onEditObject={onEditObject} />
        <MaterialMenu selectedObj={selectedObj} onEditObject={onEditObject} />
      </div>
    </div>
  )
}

export default EditMenu
