import React, { useEffect, useRef } from 'react'
import { Formik, useFormikContext } from 'formik'
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiCheck, mdiInformation } from '@mdi/js'
import PortalHeader from '../components/PortalHeader.jsx'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import OtpInput from '../components/ui/OtpInput.jsx'
import { validateAccount } from '../formSchema.js'

function VerificationPageFields({
  account,
  setAccount,
  accountDetails,
  accountLookupError,
  isResolvingAccount,
  onSendOtp,
  onAccountChange,
  resendSeconds,
  otpError,
  otpStatus,
  resetOtpVerification,
  verifyOtp,
  onVerified,
  onCancel,
}) {
  const { values, setFieldValue } = useFormikContext()
  const verifiedNavigationTimer = useRef(null)

  useEffect(
    () => () => window.clearTimeout(verifiedNavigationTimer.current),
    [],
  )

  return (
    <>
      <PortalHeader />
      <main className="container container--narrow verification-page">
        <div className="verify-title">
          <Button
            variant="back"
            onClick={onCancel}
            aria-label="Back to services"
          >
            <Icon path={mdiArrowLeft} size={1} />
          </Button>
          <h1>Identity Document Update</h1>
        </div>
        <div className="gold-rule" />
        <div className="verify-form">
          <FormField
            name="account"
            id="account-number"
            label="Account number"
            value={account}
            trailing={
              isResolvingAccount && (
                <span className="field-spinner" role="status">
                  <span className="field-spinner__wheel" aria-hidden="true" />
                  <span className="sr-only">Checking account number</span>
                </span>
              )
            }
            onChange={(event) => {
              const next = event.target.value.replace(/\D/g, '').slice(0, 10)
              setAccount(next)
              setFieldValue('account', next)
              if (next !== values.account) {
                setFieldValue('otp', '')
                resetOtpVerification()
                onAccountChange(next)
              }
            }}
            placeholder="Enter your 10-digits account number"
            inputMode="numeric"
            maxLength={10}
          />
          {accountLookupError && (
            <p className="form-error" role="alert">
              {accountLookupError}
            </p>
          )}
          {accountDetails && (
            <>
              <label className="otp-label">Phone number verification</label>
              <div className="otp-line">
                <OtpInput
                  value={values.otp}
                  disabled={otpStatus === 'verified'}
                  invalid={otpStatus === 'invalid'}
                  onChange={(otp) => {
                    setFieldValue('otp', otp)
                    resetOtpVerification()
                    if (otp.length === 6) {
                      void verifyOtp(otp).then((verified) => {
                        if (verified) {
                          verifiedNavigationTimer.current = window.setTimeout(
                            onVerified,
                            1000,
                          )
                        }
                      })
                    }
                  }}
                />
                {otpStatus === 'verified' ? (
                  <span
                    className="otp-ok"
                    role="status"
                    aria-label="OTP verified"
                  >
                    <Icon path={mdiCheck} size={1.25} />
                  </span>
                ) : (
                  <span className="resend-text">
                    Didn’t receive OTP?{' '}
                    <Button
                      className="text-button"
                      disabled={resendSeconds > 0 || isResolvingAccount}
                      onClick={() => {
                        setFieldValue('otp', '')
                        resetOtpVerification()
                        void onSendOtp(values.account)
                      }}
                    >
                      {resendSeconds > 0
                        ? `Resend in 0:${String(resendSeconds).padStart(2, '0')}`
                        : 'Resend OTP'}
                    </Button>
                  </span>
                )}
              </div>
              {otpError && (
                <div className="otp-error">
                  <Icon path={mdiInformation} size={0.9} />
                  {otpError}{' '}
                  <Button
                    className="text-button"
                    onClick={() => {
                      setFieldValue('otp', '')
                      resetOtpVerification()
                    }}
                  >
                    Cancel Request
                  </Button>
                </div>
              )}
              {otpStatus !== 'verified' && (
                <p className="otp-instruction">
                  Kindly input the 6-digit OTP sent to your registered phone
                  number {accountDetails.phoneNumber} and email address{' '}
                  {accountDetails.email}
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

function VerificationPage(props) {
  return (
    <Formik
      initialValues={{ account: props.account, otp: '' }}
      validateOnBlur
      validate={validateAccount}
    >
      <VerificationPageFields {...props} />
    </Formik>
  )
}

export default VerificationPage
