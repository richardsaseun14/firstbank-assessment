import React from 'react'
import IdentityUpdateProvider from '../contexts/IdentityUpdateContext.jsx'
import IdentityUpdateFlow from './IdentityUpdateFlow.jsx'

// Entry point for the lazily loaded identity update chunk. Keeping the
// provider and flow together means Formik, Zod and the form pages are only
// downloaded when the user enters /identity-update.
function IdentityUpdateRoute() {
  return (
    <IdentityUpdateProvider>
      <IdentityUpdateFlow />
    </IdentityUpdateProvider>
  )
}

export default IdentityUpdateRoute
