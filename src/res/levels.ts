import { USERDATA_ARROW, USERDATA_PILLAR, USERDATA_WALL } from './userDataName'

export const levels = {
  1: {
    id: 1,
    walls: [
      {
        position: [-10, 0, -10],
        rotation: [0, Math.PI / 2, 0],
        size: [12, 4, 2],
        userData: { id: USERDATA_WALL },
      },
      {
        position: [-2, 0, -2],
        rotation: [0, Math.PI / 2, 0],
        size: [10, 4, 2],
        userData: { id: USERDATA_WALL },
      },
      {
        position: [-10, 0, 2],
        rotation: [],
        size: [16, 4, 2],
        userData: { id: USERDATA_WALL },
      },
      {
        position: [-14, 0, 6.5],
        rotation: [],
        size: [10, 4, 1],
        userData: { id: USERDATA_WALL },
      },
      {
        position: [8, 0, -6],
        rotation: [],
        size: [10, 4, 2],
        userData: { id: USERDATA_WALL },
      },
    ],
    edgeWalls: [
      {
        position: [0, 0, -20],
        rotation: [],
        size: [40, 4, 2],
        userData: { id: USERDATA_WALL },
      },
      {
        position: [0, 0, 20],
        rotation: [],
        size: [40, 4, 2],
        userData: { id: USERDATA_WALL },
      },
      {
        position: [19, 0, 0],
        rotation: [0, Math.PI / 2, 0],
        size: [40, 4, 2],
        userData: { id: USERDATA_WALL },
      },
      {
        position: [-19, 0, 0],
        rotation: [0, Math.PI / 2, 0],
        size: [40, 4, 2],
        userData: { id: USERDATA_WALL },
      },
    ],
    finishArrow: {
      position: [-16, 1, 4.5],
      userData: { id: USERDATA_ARROW },
    },
    car: {
      position: [-16, 1, -16],
    },
    dynamics: [
      {
        position: [2, 2.5, -2],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, -2],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, -2],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 0],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 0],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 0],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 2],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 2],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 2],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 4],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 4],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 4],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 6],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 6],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 6],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 8],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 8],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 8],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 11],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 11],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 11],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 14],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 14],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 14],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [2, 2.5, 16],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [4, 2.5, 16],
        userData: { id: USERDATA_PILLAR },
      },
      {
        position: [6, 2.5, 16],
        userData: { id: USERDATA_PILLAR },
      },
    ],
  },
}
