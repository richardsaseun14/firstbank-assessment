import React from 'react'

function PageLoader() {
  return (
    <div className="page-loader" role="status">
      <span className="field-spinner__wheel" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default PageLoader
