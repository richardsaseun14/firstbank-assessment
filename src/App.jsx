import React, { useEffect, useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import ServiceLanding from './components/ServiceLanding.jsx'
import VerificationPage from './components/VerificationPage.jsx'
import LegalPage from './components/LegalPage.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ResultModal from './components/ResultModal.jsx'

// App owns workflow data; route components render one screen at a time.
// Keeping this state above <Routes> preserves form entries during navigation.
function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [account, setAccount] = useState('')
  const [otpError, setOtpError] = useState('')
  const [resend, setResend] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [formError, setFormError] = useState('')
  const [docType, setDocType] = useState('')
  const [fields, setFields] = useState({ nin: '', idNumber: '' })
  const [files, setFiles] = useState({ front: null, back: null, utility: null })
  const [modal, setModal] = useState('')

  const go = (destination, navigationState) => {
    const routes = {
      landing: '/',
      verification: '/identity-update/verify',
      form: '/identity-update/form',
      terms: '/identity-update/terms',
      consent: '/identity-update/consent',
    }
    setFormError('')
    const state =
      navigationState ??
      (destination === 'consent'
        ? { returnTo: location.pathname === '/' ? 'verification' : 'form' }
        : undefined)
    navigate(routes[destination] ?? destination, state ? { state } : undefined)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const submitForm = () => {
    setFormError('')
    setModal(
      new URLSearchParams(location.search).get('simulateFailure') === '1'
        ? 'failure'
        : 'success',
    )
  }

  const continueAfterVerification = ({ otp }) => {
    if (otp !== '123456') {
      setOtpError('That code is incorrect. Check it and try again.')
      return
    }
    setOtpError('')
    go('form')
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ServiceLanding onSelectIdentity={() => go('consent')} />}
        />
        <Route
          path="/identity-update/verify"
          element={
            <VerificationPage
              account={account}
              setAccount={setAccount}
              otpError={otpError}
              clearOtpError={() => setOtpError('')}
              resend={resend}
              onResend={() => setResend(true)}
              onContinue={continueAfterVerification}
              onCancel={() => go('landing')}
              onCancelRequest={() => setOtpError('')}
            />
          }
        />
        <Route
          path="/identity-update/form"
          element={
            <>
              <UpdateForm
                account={account}
                setAccount={setAccount}
                fields={fields}
                setFields={setFields}
                docType={docType}
                setDocType={setDocType}
                files={files}
                setFiles={setFiles}
                termsAccepted={termsAccepted}
                setTermsAccepted={setTermsAccepted}
                consentAccepted={consentAccepted}
                setConsentAccepted={setConsentAccepted}
                formError={formError}
                onSubmit={submitForm}
                onBack={() => go('verification')}
                onOpenLegal={go}
              />
              <ResultModal
                type={modal}
                onClose={() => setModal('')}
                onHome={() => {
                  setModal('')
                  go('landing')
                }}
              />
            </>
          }
        />
        <Route
          path="/identity-update/terms"
          element={
            <LegalPage
              page="terms"
              termsAccepted={termsAccepted}
              setTermsAccepted={setTermsAccepted}
              onBack={() => go('form')}
              onAgree={() => {
                setTermsAccepted(true)
                go('form')
              }}
              onReject={() => {
                setTermsAccepted(false)
                setConsentAccepted(false)
                go('form')
              }}
            />
          }
        />
        <Route
          path="/identity-update/consent"
          element={
            <LegalPage
              page="consent"
              termsAccepted={termsAccepted}
              setTermsAccepted={setTermsAccepted}
              onBack={() =>
                go(
                  location.state?.returnTo === 'verification'
                    ? 'landing'
                    : 'form',
                )
              }
              onAgree={() => {
                setConsentAccepted(true)
                go(location.state?.returnTo ?? 'verification')
              }}
              onReject={() => {
                setConsentAccepted(false)
                if (location.state?.returnTo === 'verification') {
                  go('landing')
                } else {
                  go('form')
                }
              }}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
