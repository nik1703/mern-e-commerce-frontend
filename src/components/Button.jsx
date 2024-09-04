import className from 'classnames'

function Button({ children, primary, secondary, danger, ...rest }) {
  const classes = className(
    rest.className,
    'flex justify-center items-center px-10 py-4 rounded-full text-sm font-satoshi_medium cursor-pointer',
    {
      'bg-black text-white': primary,
      'bg-white text-black': secondary,
      'bg-red-500 text-white': danger,
    }
  )

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}

export default Button
