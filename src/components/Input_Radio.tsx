interface IProps {
  value?: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}

const Radio = ({ value, options, onChange }: IProps) => {
  return (
    <div className="flex space-x-1">
      {options.map((i) => (
        <button
          key={i.value}
          className={`py-1 px-2 rounded ${
            value === i.value
              ? 'bg-gray-300 text-black'
              : 'bg-gray-700 texh-white'
          }`}
          onClick={() => onChange(i.value)}
        >
          {i.label}
        </button>
      ))}
    </div>
  )
}

export default Radio
