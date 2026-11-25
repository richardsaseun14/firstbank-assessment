import React, { useEffect } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import ServiceLanding from './pages/ServiceLanding.jsx'
import IdentityUpdateFlow from './pages/IdentityUpdateFlow.jsx'
import IdentityUpdateProvider from './contexts/IdentityUpdateContext.jsx'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ServiceLanding
            onSelectIdentity={() =>
              navigate('/identity-update/consent', {
                state: { returnTo: 'verification' },
              })
            }
          />
        }
      />
      <Route
        path="/identity-update/*"
        element={
          <IdentityUpdateProvider>
            <IdentityUpdateFlow />
          </IdentityUpdateProvider>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
