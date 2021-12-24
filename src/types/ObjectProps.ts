import { MeshStandardMaterialProps } from '@react-three/fiber'

export type IObjectProps<T> = T & {
  material: MeshStandardMaterialProps
}
