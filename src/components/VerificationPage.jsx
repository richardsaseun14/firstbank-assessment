import React from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiArrowRight, mdiInformation } from '@mdi/js'
import PortalHeader from './PortalHeader.jsx'
import Button from './ui/Button.jsx'
import FormField from './ui/FormField.jsx'
import OtpInput from './ui/OtpInput.jsx'
import { accountSchema, validateAccount } from '../formSchema.js'

function VerificationPageFields({
  account,
  setAccount,
  otpError,
  clearOtpError,
  resend,
  onResend,
  onCancel,
  onCancelRequest,
}) {
  const { values, setFieldValue } = useFormikContext()
  const accountIsValid = accountSchema.safeParse(values.account).success

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
              if (next !== values.account) {
                setFieldValue('otp', '')
                clearOtpError()
              }
            }}
            placeholder="Enter your 10-digits account number"
            inputMode="numeric"
            maxLength={10}
          />
          {accountIsValid && (
            <>
              <label className="otp-label">Phone number verification</label>
              <div className="otp-line">
                <OtpInput
                  value={values.otp}
                  invalid={Boolean(otpError)}
                  onChange={(otp) => {
                    setFieldValue('otp', otp)
                    if (otpError) clearOtpError()
                  }}
                />
                <span className="resend-text">
                  Didn’t receive OTP?{' '}
                  <Button
                    className="text-button"
                    onClick={() => {
                      setFieldValue('otp', '')
                      onResend()
                      clearOtpError()
                    }}
                  >
                    {resend ? 'OTP resent' : 'Resend in 0.56 secs'}
                  </Button>
                </span>
              </div>
              {otpError && (
                <div className="otp-error">
                  <Icon path={mdiInformation} size={0.9} />
                  {otpError}{' '}
                  <Button
                    className="text-button"
                    onClick={() => {
                      setFieldValue('otp', '')
                      clearOtpError()
                      onCancelRequest()
                    }}
                  >
                    Cancel Request
                  </Button>
                </div>
              )}
              <p className="otp-instruction">
                Kindly input the 6-digit OTP sent to your registered phone
                number +23480**78 and email address ade****yu@gmail.com
              </p>
              {values.otp.length === 6 && (
                <Button variant="continue" type="submit">
                  Continue <Icon path={mdiArrowRight} size={0.8} />
                </Button>
              )}
            </>
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
      validate={validateAccount}
      onSubmit={props.onContinue}
    >
      <VerificationPageFields {...props} />
    </Formik>
  )
}

export default VerificationPage
