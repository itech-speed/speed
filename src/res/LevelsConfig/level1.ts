import { ILevelConfig } from 'src/types/LevelConfig'

import { USERDATA_ARROW, USERDATA_PILLAR, USERDATA_WALL } from '../userDataName'

export const level1: ILevelConfig = {
  id: 1,
  img: '/img/lvl1.png',
  car: {
    position: [-16, 1, -16],
  },
  objects: [
    {
      objectType: 'arrow',
      position: [-16, 1, 4.5],
      userData: { id: USERDATA_ARROW },
    },
    {
      objectType: 'box',
      type: 'Static',
      position: [0, 0, -20],
      args: [40, 4, 2],
      userData: { id: USERDATA_WALL },
    },
    {
      objectType: 'box',
      type: 'Static',
      position: [0, 0, 20],
      args: [40, 4, 2],
      userData: { id: USERDATA_WALL },
    },
    {
      objectType: 'box',
      type: 'Static',
      position: [19, 0, 0],
      rotation: [0, Math.PI / 2, 0],
      args: [40, 4, 2],
      userData: { id: USERDATA_WALL },
    },
    {
      objectType: 'box',
      type: 'Static',
      position: [-19, 0, 0],
      rotation: [0, Math.PI / 2, 0],
      args: [40, 4, 2],
      userData: { id: USERDATA_WALL },
    },

    {
      objectType: 'box',
      type: 'Static',
      position: [-2, 0, -2],
      rotation: [0, Math.PI / 2, 0],
      args: [10, 4, 2],
      userData: { id: USERDATA_WALL },
    },
    {
      objectType: 'box',
      type: 'Static',
      position: [-10, 0, 2],
      args: [16, 4, 2],
      userData: { id: USERDATA_WALL },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, -2],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, -2],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 0],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 0],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 0],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 2],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 2],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 2],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 4],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 4],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 4],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 6],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 6],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 6],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 8],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 8],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 8],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 11],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 11],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 11],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 14],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 14],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 14],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [2, 2.5, 16],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [4, 2.5, 16],
      userData: { id: USERDATA_PILLAR },
    },
    {
      objectType: 'cylinder',
      type: 'Dynamic',
      position: [6, 2.5, 16],
      userData: { id: USERDATA_PILLAR },
    },
  ],
}
