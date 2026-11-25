import React, { useRef } from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import clsx from 'clsx'
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiArrowRight, mdiCheck, mdiInformation } from '@mdi/js'
import PortalHeader from './PortalHeader.jsx'
import Button from './ui/Button.jsx'
import FormField from './ui/FormField.jsx'
import { validateVerification } from '../formSchema.js'

function VerificationPageFields({
  account,
  setAccount,
  resend,
  onResend,
  verifyError,
  setVerifyError,
  onCancel,
  onCancelRequest,
}) {
  const otpRefs = useRef([])
  const { values, errors, setFieldValue } = useFormikContext()
  const otpStatus =
    values.otp.length === 6 ? (errors.otp ? 'invalid' : 'verified') : ''

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
        <Form className="verify-form" noValidate>
          <FormField
            name="account"
            id="account-number"
            label="Account number"
            value={account}
            onChange={(event) => {
              const next = event.target.value.replace(/\D/g, '').slice(0, 10)
              setAccount(next)
              setFieldValue('account', next)
              setVerifyError('')
            }}
            placeholder="Enter your 10-digits account number"
            inputMode="numeric"
            maxLength={10}
          />
          <label className="otp-label">Phone number verification</label>
          <div className="otp-line">
            <div className="otp-cells">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  ref={(element) => (otpRefs.current[index] = element)}
                  aria-label={`OTP digit ${index + 1}`}
                  className={clsx({
                    'otp-invalid': otpStatus === 'invalid',
                    'otp-verified': otpStatus === 'verified',
                  })}
                  value={values.otp[index] ?? ''}
                  onChange={(event) => {
                    const digit = event.target.value
                      .replace(/\D/g, '')
                      .slice(-1)
                    const next = values.otp.split('')
                    next[index] = digit
                    setFieldValue('otp', next.join(''))
                    if (digit && index < 5) otpRefs.current[index + 1]?.focus()
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Backspace' &&
                      !values.otp[index] &&
                      index
                    )
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
                <Button
                  className="text-button"
                  onClick={() => {
                    setFieldValue('otp', '')
                    onResend()
                    otpRefs.current[0]?.focus()
                  }}
                >
                  {resend ? 'OTP resent' : 'Resend in 0.56 secs'}
                </Button>
              </span>
            )}
          </div>
          {otpStatus === 'invalid' && (
            <div className="otp-error">
              <Icon path={mdiInformation} size={0.9} />
              {errors.otp}{' '}
              <Button
                className="text-button"
                onClick={() => {
                  setFieldValue('otp', '')
                  onCancelRequest()
                }}
              >
                Cancel Request
              </Button>
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
            <Button variant="continue" type="submit">
              Continue <Icon path={mdiArrowRight} size={0.8} />
            </Button>
          )}
        </Form>
      </main>
    </>
  )
}

function VerificationPage(props) {
  return (
    <Formik
      initialValues={{ account: props.account, otp: '' }}
      validateOnBlur
      validate={validateVerification}
      onSubmit={props.onContinue}
    >
      <VerificationPageFields {...props} />
    </Formik>
  )
}

export default VerificationPage
