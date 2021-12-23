import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber'

export type IObjectProps = MeshProps & {
  material: MeshStandardMaterialProps
}
