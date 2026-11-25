import React, { useRef, useState } from 'react'
import Icon from '@mdi/react'
import { mdiPaperclip, mdiClose, mdiCloudUploadOutline } from '@mdi/js'

function UploadBox({ label, file, onFile, required = false }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const choose = (candidate) => {
    if (!candidate) return
    if (
      !['application/pdf', 'image/jpeg', 'image/png'].includes(candidate.type)
    )
      return setError('Upload a PDF, JPG or PNG file.')
    if (candidate.size > 10 * 1024 * 1024)
      return setError('File size must be 10 MB or less.')
    setError('')
    onFile(candidate)
  }
  return (
    <div className="upload-field">
      <label>
        {label}
        {required && <span className="req">*</span>}
      </label>
      {file ? (
        <div className="attached-file">
          <Icon path={mdiPaperclip} size={0.8} />
          <span>{file.name}</span>
          <small>({(file.size / 1024 / 1024).toFixed(2)} MB)</small>
          <button
            type="button"
            aria-label={`Remove ${label}`}
            onClick={() => {
              onFile(null)
              if (inputRef.current) inputRef.current.value = ''
            }}
          >
            <Icon path={mdiClose} size={0.75} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="upload-box"
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
          <small>Supported files: PDF and JPG, 10.00MB maximum size</small>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        onChange={(event) => choose(event.target.files?.[0])}
        hidden
      />
      {error && (
        <span className="upload-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default UploadBox
