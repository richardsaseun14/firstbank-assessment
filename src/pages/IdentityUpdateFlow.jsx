import React, { useEffect, useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import VerificationPage from './VerificationPage.jsx'
import LegalPage from './LegalPage.jsx'
import UpdateForm from './UpdateForm.jsx'
import ResultModal from '../components/ResultModal.jsx'
import useIdentityUpdate from '../contexts/useIdentityUpdate.js'

function IdentityUpdateFlow() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formUnlocked, setFormUnlocked] = useState(false)
  const {
    account,
    setAccount,
    otpError,
    otpStatus,
    accountDetails,
    accountLookupError,
    isResolvingAccount,
    resendSeconds,
    termsAccepted,
    setTermsAccepted,
    setConsentAccepted,
    formError,
    setFormError,
    docType,
    setDocType,
    fields,
    setFields,
    files,
    setFiles,
    modal,
    setModal,
    sendOtp,
    resetAccountLookup,
    verifyOtp,
    resetOtpVerification,
    submitForm,
  } = useIdentityUpdate()

  useEffect(() => {
    if (formUnlocked) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [formUnlocked])

  const go = (destination, navigationState) => {
    const routes = {
      landing: '/',
      verification: '/identity-update',
      identityUpdate: '/identity-update',
      terms: '/identity-update/terms',
      consent: '/identity-update/consent',
    }
    setFormError('')
    const state =
      navigationState ??
      (destination === 'consent'
        ? {
            returnTo:
              location.pathname === '/' ? 'verification' : 'identityUpdate',
          }
        : undefined)
    navigate(
      { pathname: routes[destination] ?? destination, search: location.search },
      state ? { state } : undefined,
    )
  }

  const updateFormPage = (
    <>
      <UpdateForm
        account={account}
        fields={fields}
        setFields={setFields}
        docType={docType}
        setDocType={setDocType}
        files={files}
        setFiles={setFiles}
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
        formError={formError}
        onSubmit={(values) => submitForm(values, location.search)}
        onBack={() => {
          resetOtpVerification()
          setFormUnlocked(false)
        }}
        onOpenLegal={go}
      />
      <ResultModal
        type={modal}
        onClose={() => setModal('')}
        onSkip={() => setModal('success')}
        onUpload={() => {
          setModal('')
          document
            .getElementById('utility-upload')
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }}
        onHome={() => {
          setModal('')
          go('landing')
        }}
      />
    </>
  )

  return (
    <Routes>
      <Route
        index
        element={
          formUnlocked ? (
            updateFormPage
          ) : (
            <VerificationPage
              account={account}
              setAccount={setAccount}
              accountDetails={accountDetails}
              accountLookupError={accountLookupError}
              isResolvingAccount={isResolvingAccount}
              onAccountChange={resetAccountLookup}
              onSendOtp={sendOtp}
              resendSeconds={resendSeconds}
              otpError={otpError}
              otpStatus={otpStatus}
              resetOtpVerification={resetOtpVerification}
              verifyOtp={verifyOtp}
              onVerified={() => setFormUnlocked(true)}
              onCancel={() => go('landing')}
              onCancelRequest={resetOtpVerification}
            />
          )
        }
      />
      <Route
        path="terms"
        element={
          <LegalPage
            page="terms"
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            onBack={() => go('identityUpdate')}
            onAgree={() => {
              setTermsAccepted(true)
              go('identityUpdate')
            }}
            onReject={() => {
              setTermsAccepted(false)
              setConsentAccepted(false)
              go('identityUpdate')
            }}
          />
        }
      />
      <Route
        path="consent"
        element={
          <LegalPage
            page="consent"
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            onBack={() =>
              go(
                location.state?.returnTo === 'verification'
                  ? 'landing'
                  : 'identityUpdate',
              )
            }
            onAgree={() => {
              setConsentAccepted(true)
              go(location.state?.returnTo ?? 'verification')
            }}
            onReject={() => {
              setConsentAccepted(false)
              go(
                location.state?.returnTo === 'verification'
                  ? 'landing'
                  : 'identityUpdate',
              )
            }}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default IdentityUpdateFlow
