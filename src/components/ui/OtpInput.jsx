import React, { useRef } from 'react'
import clsx from 'clsx'

const OTP_LENGTH = 6

/**
 * Six single-digit boxes. `value` is an array of six strings, with '' for an
 * empty box, so every digit keeps its position when another box is edited.
 */
function OtpInput({ value, onChange, invalid = false, disabled = false }) {
  const inputRefs = useRef([])

  const focusBox = (index) =>
    inputRefs.current[Math.min(index, OTP_LENGTH - 1)]?.focus()

  const fillFrom = (start, digits) => {
    onChange(
      value.map((digit, index) => {
        const offset = index - start
        return offset >= 0 && offset < digits.length ? digits[offset] : digit
      }),
    )
    focusBox(start + digits.length)
  }

  const updateDigit = (index, rawValue) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1)
    onChange(
      value.map((current, position) => (position === index ? digit : current)),
    )
    if (digit && index < OTP_LENGTH - 1) focusBox(index + 1)
  }

  const pasteDigits = (index, event) => {
    event.preventDefault()
    const digits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH - index)
      .split('')
    if (digits.length) fillFrom(index, digits)
  }

  return (
    <div className="otp-cells">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(element) => (inputRefs.current[index] = element)}
          aria-label={`OTP digit ${index + 1}`}
          className={clsx({ 'otp-invalid': invalid })}
          value={digit}
          disabled={disabled}
          onChange={(event) => updateDigit(index, event.target.value)}
          onPaste={(event) => pasteDigits(index, event)}
          // Selecting on focus lets a new digit replace a filled box.
          onFocus={(event) => event.target.select()}
          onKeyDown={(event) => {
            if (event.key === 'Backspace' && !digit && index)
              focusBox(index - 1)
          }}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
        />
      ))}
    </div>
  )
}

export default OtpInput
