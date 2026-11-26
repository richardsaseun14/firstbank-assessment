import React, { useId, useRef, useState } from 'react'
import Icon from '@mdi/react'
import { mdiPaperclip, mdiClose, mdiCloudUploadOutline } from '@mdi/js'
import Button from './ui/Button.jsx'

function UploadBox({ label, file, onFile, required = false, validationError }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const id = useId()
  const buttonId = `${id}-button`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const message = error || validationError
  const choose = (candidate) => {
    if (!candidate) return
    if (
      !['application/pdf', 'image/jpeg', 'image/png'].includes(candidate.type)
    )
      return setError('Choose a PDF, JPG, or PNG file.')
    if (candidate.size > 10 * 1024 * 1024)
      return setError('Choose a file that is 10 MB or smaller.')
    setError('')
    onFile(candidate)
  }
  return (
    <div className="upload-field">
      {/* A label can name a button. The file input itself is hidden, so the
          label points at the button that opens the file picker. */}
      <label htmlFor={file ? undefined : buttonId}>
        {label}
        {required && (
          <span className="req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {file ? (
        <div className="attached-file">
          <Icon path={mdiPaperclip} size={0.8} />
          <span>{file.name}</span>
          <small>({(file.size / 1024 / 1024).toFixed(2)} MB)</small>
          <Button
            aria-label={`Remove ${label}`}
            onClick={() => {
              onFile(null)
              if (inputRef.current) inputRef.current.value = ''
            }}
          >
            <Icon path={mdiClose} size={0.75} />
          </Button>
        </div>
      ) : (
        <Button
          id={buttonId}
          variant="upload"
          aria-describedby={message ? `${hintId} ${errorId}` : hintId}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            choose(event.dataTransfer.files?.[0])
          }}
        >
          <Icon path={mdiCloudUploadOutline} size={1} />
          <span>
            <u>Choose file</u> or drag here
          </span>
          <small id={hintId}>
            Supported files: PDF and JPG, 10.00MB maximum size
          </small>
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        onChange={(event) => choose(event.target.files?.[0])}
        hidden
      />
      {message && (
        <span id={errorId} className="upload-error" role="alert">
          {message}
        </span>
      )}
    </div>
  )
}

export default UploadBox
