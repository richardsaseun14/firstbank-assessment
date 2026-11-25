import React, { useRef } from 'react'
import clsx from 'clsx'

function OtpInput({ value, onChange, invalid = false }) {
  const inputRefs = useRef([])

  const updateDigit = (index, rawValue) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1)
    const next = value.split('')
    next[index] = digit
    onChange(next.join(''))
    if (digit && index < 5) inputRefs.current[index + 1]?.focus()
  }

  return (
    <div className="otp-cells">
      {Array.from({ length: 6 }, (_, index) => (
        <input
          key={index}
          ref={(element) => (inputRefs.current[index] = element)}
          aria-label={`OTP digit ${index + 1}`}
          className={clsx({ 'otp-invalid': invalid })}
          value={value[index] ?? ''}
          onChange={(event) => updateDigit(index, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Backspace' && !value[index] && index)
              inputRefs.current[index - 1]?.focus()
          }}
          inputMode="numeric"
          maxLength={1}
        />
      ))}
    </div>
  )
}

export default OtpInput
