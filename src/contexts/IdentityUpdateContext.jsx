import React, { useEffect, useRef, useState } from 'react'
import IdentityUpdateContext from './identityUpdateContext.js'
import MockBankServer from '../services/MockBankServer.js'

const mockBankServer = new MockBankServer()

export default function IdentityUpdateProvider({ children }) {
  const [account, setAccount] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpStatus, setOtpStatus] = useState('idle')
  const [accountDetails, setAccountDetails] = useState(null)
  const [accountLookupError, setAccountLookupError] = useState('')
  const [isResolvingAccount, setIsResolvingAccount] = useState(false)
  const [resendAt, setResendAt] = useState(0)
  const [resendSeconds, setResendSeconds] = useState(0)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [formError, setFormError] = useState('')
  const [docType, setDocType] = useState('')
  const [fields, setFields] = useState({ nin: '', idNumber: '' })
  const [files, setFiles] = useState({ front: null, back: null, utility: null })
  const [modal, setModal] = useState('')
  const accountRequestId = useRef(0)
  const otpRequestId = useRef(0)

  const resetOtpVerification = () => {
    otpRequestId.current += 1
    setOtpError('')
    setOtpStatus('idle')
  }

  useEffect(() => {
    if (!resendAt) return undefined
    const update = () => {
      const remaining = Math.max(0, Math.ceil((resendAt - Date.now()) / 1000))
      setResendSeconds(remaining)
      if (remaining === 0) setResendAt(0)
    }
    update()
    const timer = window.setInterval(update, 250)
    return () => window.clearInterval(timer)
  }, [resendAt])

  const sendOtp = async (accountNumber) => {
    const requestId = ++accountRequestId.current
    setIsResolvingAccount(true)
    setAccountLookupError('')
    let result
    try {
      result = await mockBankServer.confirmAccountAndSendOtp(accountNumber)
    } finally {
      if (requestId === accountRequestId.current) setIsResolvingAccount(false)
    }

    if (requestId !== accountRequestId.current) return false
    if (!result.success) {
      setAccountDetails(null)
      setAccountLookupError(result.message)
      return false
    }

    setAccountDetails(result.account)
    resetOtpVerification()
    setResendAt(Date.now() + 59000)
    setResendSeconds(59)
    return true
  }

  const resetAccountLookup = (nextAccount) => {
    accountRequestId.current += 1
    setIsResolvingAccount(false)
    setAccountDetails(null)
    setAccountLookupError('')
    resetOtpVerification()
    setResendAt(0)
    setResendSeconds(0)
    if (/^\d{10}$/.test(nextAccount)) void sendOtp(nextAccount)
  }

  const verifyOtp = async (code) => {
    const requestId = ++otpRequestId.current
    setOtpStatus('checking')
    const result = await mockBankServer.verifyOtp(account, code)
    if (requestId !== otpRequestId.current) return false
    if (!result.success) {
      setOtpError(result.message)
      setOtpStatus('invalid')
      return false
    }
    setOtpError('')
    setOtpStatus('verified')
    return true
  }

  const submitForm = (search = '') => {
    setFormError('')
    setModal(
      new URLSearchParams(search).get('simulateFailure') === '1'
        ? 'failure'
        : 'success',
    )
  }

  const value = {
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
    consentAccepted,
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
  }

  return (
    <IdentityUpdateContext.Provider value={value}>
      {children}
    </IdentityUpdateContext.Provider>
  )
}
