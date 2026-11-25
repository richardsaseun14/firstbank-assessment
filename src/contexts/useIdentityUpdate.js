import { useContext } from 'react'
import IdentityUpdateContext from './identityUpdateContext.js'

export default function useIdentityUpdate() {
  const context = useContext(IdentityUpdateContext)
  if (!context) {
    throw new Error(
      'useIdentityUpdate must be used within IdentityUpdateProvider.',
    )
  }
  return context
}
