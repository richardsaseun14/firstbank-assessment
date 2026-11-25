import React from 'react'
import { useField } from 'formik'

function FormField({ label, as = 'input', ...props }) {
  const [field, meta] = useField(props.name)
  const Component = as
  const hasError = meta.touched && Boolean(meta.error)

  return (
    <>
      <label htmlFor={props.id ?? props.name}>{label}</label>
      <Component
        {...field}
        {...props}
        id={props.id ?? props.name}
        className={props.className ?? 'large-input'}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${props.name}-error` : undefined}
      />
      {hasError && (
        <span id={`${props.name}-error`} className="upload-error">
          {meta.error}
        </span>
      )}
    </>
  )
}

export default FormField
