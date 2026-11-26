import React from 'react'
import clsx from 'clsx'

const variantClasses = {
  primary: 'navy-action',
  outline: 'outline-action',
  update: 'update-button',
  back: 'back-arrow',
  icon: 'header-search',
  help: 'help-button',
  continue: 'verify-continue',
  upload: 'upload-box',
}

/** Shared button primitive. Variants reuse the portal's existing visual styles. */
function Button({
  variant,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const classes = clsx('button', variantClasses[variant], className)
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
