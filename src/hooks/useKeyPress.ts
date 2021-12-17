import { useEffect } from 'react'

export const useKeyPress = (
  target: string[],
  event: (cur: boolean, key: string) => void,
  dependency: any[] = [],
) => {
  useEffect(() => {
    const downHandler = ({ key }: any) =>
      target.indexOf(key) !== -1 && event(true, key)
    const upHandler = ({ key }: any) =>
      target.indexOf(key) !== -1 && event(false, key)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, dependency)
}
