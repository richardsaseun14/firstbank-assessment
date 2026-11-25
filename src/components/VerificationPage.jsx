import React from 'react'
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiArrowRight, mdiCheck, mdiInformation } from '@mdi/js'
import PortalHeader from './PortalHeader.jsx'

function VerificationPage({
  account,
  setAccount,
  otp,
  otpStatus,
  onOtpChange,
  otpRefs,
  resend,
  onResend,
  setOtp,
  setOtpStatus,
  verifyError,
  setVerifyError,
  onContinue,
  onCancel,
  onCancelRequest,
}) {
  return (
    <>
      <PortalHeader />
      <main className="verification-page">
        <div className="verify-title">
          <button
            className="back-arrow"
            onClick={() => onCancel()}
            aria-label="Back to services"
          >
            <Icon path={mdiArrowLeft} size={1} />
          </button>
          <h1>Identity Document Update</h1>
        </div>
        <div className="gold-rule" />
        <div className="verify-form">
          <label htmlFor="account-number">Account number</label>
          <input
            id="account-number"
            className="large-input"
            value={account}
            onChange={(event) => {
              setAccount(event.target.value.replace(/\D/g, '').slice(0, 10))
              setVerifyError('')
            }}
            placeholder="Enter your 10-digits account number"
            inputMode="numeric"
            maxLength={10}
          />
          <label className="otp-label">Phone number verification</label>
          <div className="otp-line">
            <div className="otp-cells">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => (otpRefs.current[index] = element)}
                  aria-label={`OTP digit ${index + 1}`}
                  className={
                    otpStatus === 'invalid'
                      ? 'otp-invalid'
                      : otpStatus === 'verified'
                        ? 'otp-verified'
                        : ''
                  }
                  value={digit}
                  onChange={(event) => onOtpChange(index, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && !digit && index)
                      otpRefs.current[index - 1]?.focus()
                  }}
                  inputMode="numeric"
                  maxLength={1}
                />
              ))}
            </div>
            {otpStatus === 'verified' ? (
              <span className="otp-ok">
                <Icon path={mdiCheck} size={1.25} />
              </span>
            ) : (
              <span className="resend-text">
                Didn’t receive OTP?{' '}
                <button
                  onClick={() => {
                    setOtp(['', '', '', '', '', ''])
                    setOtpStatus('')
                    onResend()
                    otpRefs.current[0]?.focus()
                  }}
                >
                  {resend ? 'OTP resent' : 'Resend in 0.56 secs'}
                </button>
              </span>
            )}
          </div>
          {otpStatus === 'invalid' && (
            <div className="otp-error">
              <Icon path={mdiInformation} size={0.9} />
              The OTP Code inputted is wrong or invalid.{' '}
              <button onClick={onCancelRequest}>Cancel Request</button>
            </div>
          )}
          {verifyError && (
            <p className="form-error" role="alert">
              {verifyError}
            </p>
          )}
          <p className="otp-instruction">
            Kindly input the 6-digit OTP sent to your registered phone number
            +23480******78 and email address ade****yu@gmail.com
          </p>
          {otpStatus === 'verified' && (
            <button className="verify-continue" onClick={onContinue}>
              Continue <Icon path={mdiArrowRight} size={0.8} />
            </button>
          )}
        </div>
      </main>
    </>
  )
}

export default VerificationPage
