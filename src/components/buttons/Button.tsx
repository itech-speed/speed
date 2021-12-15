import { Link } from 'react-router-dom'

interface IBaseProps {
  className?: string
  children: React.ReactNode
}

interface ILink extends IBaseProps {
  link: string
  onClick?: () => void
}

interface IButton extends IBaseProps {
  link: never
  onClick: () => void
}

type IProps = IButton | ILink

const Button = ({ className = '', link, onClick, children }: IProps) => {
  const classes = `${className} bg-blue-400 rounded inline-block px-2 py-1 hover:bg-blue-300`

  return (
    <>
      {link ? (
        <Link to={link} onClick={onClick} className={classes}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </>
  )
}

export default Button
