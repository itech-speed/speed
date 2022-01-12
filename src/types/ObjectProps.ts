import { MeshStandardMaterialProps } from '@react-three/fiber'

export type IObjectProps<T> = T & {
  castShadow?: boolean
  material: MeshStandardMaterialProps
}
