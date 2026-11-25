import React, { useEffect, useRef, useState } from 'react'
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
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpStatus, setOtpStatus] = useState('')
  const [verifyError, setVerifyError] = useState('')
  const [resend, setResend] = useState(false)
  const otpRefs = useRef([])
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
    const state = navigationState ?? (destination === 'consent'
      ? { returnTo: location.pathname === '/' ? 'verification' : 'form' }
      : undefined)
    navigate(routes[destination] ?? destination, state ? { state } : undefined)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const otpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    setOtpStatus('')
    if (digit && index < 5) otpRefs.current[index + 1]?.focus()
    if (next.every(Boolean))
      setOtpStatus(next.join('') === '123456' ? 'verified' : 'invalid')
  }

  const submitForm = (event) => {
    event.preventDefault()
    setFormError('')
    if (!/^\d{10}$/.test(account))
      return setFormError('Enter a valid 10-digit account number.')
    if (!/^\d{10,11}$/.test(fields.nin))
      return setFormError('Enter a valid NIN (10 or 11 digits).')
    if (!docType) return setFormError('Choose an identity document type.')
    if (!fields.idNumber.trim())
      return setFormError('Enter your identity document number.')
    if (!files.front || !files.back)
      return setFormError(
        'Upload both the front and back of your identity document.',
      )
    if (!files.utility)
      return setFormError('Upload a utility bill to continue.')
    if (!termsAccepted || !consentAccepted)
      return setFormError(
        'Accept the terms and data processing consent to continue.',
      )
    setModal(
      new URLSearchParams(location.search).get('simulateFailure') === '1'
        ? 'failure'
        : 'success',
    )
  }

  const continueAfterVerification = () => {
    if (!/^\d{10}$/.test(account))
      return setVerifyError('Enter a valid 10-digit account number.')
    go('form')
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ServiceLanding onSelectIdentity={() => go('consent')} />
          }
        />
        <Route
          path="/identity-update/verify"
          element={
            <VerificationPage
              account={account}
              setAccount={setAccount}
              otp={otp}
              otpStatus={otpStatus}
              onOtpChange={otpChange}
              otpRefs={otpRefs}
              resend={resend}
              onResend={() => setResend(true)}
              setOtp={setOtp}
              setOtpStatus={setOtpStatus}
              verifyError={verifyError}
              setVerifyError={setVerifyError}
              onContinue={continueAfterVerification}
              onCancel={() => go('landing')}
              onCancelRequest={() => {
                setOtp(['', '', '', '', '', ''])
                setOtpStatus('')
                setVerifyError('')
              }}
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
              onBack={() => go(location.state?.returnTo === 'verification' ? 'landing' : 'form')}
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
