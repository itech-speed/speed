import React from 'react'
import { IWeight } from 'src/types/Weight'

interface IProps {
  children: React.ReactNode
  className?: string
  weight?: IWeight
}

const H6 = ({ className = '', weight = 'regural', children }: IProps) => {
  return <h6 className={`${className} font-${weight} text-xl`}>{children}</h6>
}

export default H6
