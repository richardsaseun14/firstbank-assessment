import React, { Suspense, lazy, useEffect } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import ServiceLanding from './pages/ServiceLanding.jsx'
import PageLoader from './components/PageLoader.jsx'

const IdentityUpdateRoute = lazy(
  () => import('./pages/IdentityUpdateRoute.jsx'),
)

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
              navigate(`/identity-update/consent${location.search}`, {
                state: { returnTo: 'verification' },
              })
            }
          />
        }
      />
      <Route
        path="/identity-update/*"
        element={
          <Suspense fallback={<PageLoader />}>
            <IdentityUpdateRoute />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
