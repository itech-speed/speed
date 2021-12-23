import {
  USERDATA_ARROW,
  USERDATA_PILLAR,
  USERDATA_WALL,
} from 'src/res/userDataName'

export type TCollideType =
  | typeof USERDATA_WALL
  | typeof USERDATA_PILLAR
  | typeof USERDATA_ARROW
