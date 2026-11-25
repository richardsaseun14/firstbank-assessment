import React from 'react'
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js'
import PortalHeader from './PortalHeader.jsx'
import UploadBox from './UploadBox.jsx'

function UpdateForm({
  account,
  setAccount,
  fields,
  setFields,
  docType,
  setDocType,
  files,
  setFiles,
  termsAccepted,
  setTermsAccepted,
  consentAccepted,
  setConsentAccepted,
  formError,
  onSubmit,
  onBack,
  onOpenLegal,
}) {
  return (
    <>
      <PortalHeader
        terms={termsAccepted}
        setTerms={setTermsAccepted}
        onOpenTerms={() => onOpenLegal('terms')}
      />
      <main className="update-page">
        <div className="update-title">
          <button
            className="back-arrow"
            onClick={onBack}
            aria-label="Back to verification"
          >
            <Icon path={mdiArrowLeft} size={1} />
          </button>
          <h1>Identity Document Update</h1>
        </div>
        <div className="gold-rule" />
        <form className="update-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="account-form">Account number</label>
          <input
            id="account-form"
            className="large-input"
            value={account}
            onChange={(event) =>
              setAccount(event.target.value.replace(/\D/g, '').slice(0, 10))
            }
            placeholder="Enter your 10-digits account number"
            inputMode="numeric"
            maxLength={10}
          />
          <label htmlFor="nin">NIN</label>
          <input
            id="nin"
            className="large-input"
            value={fields.nin}
            onChange={(event) =>
              setFields({
                ...fields,
                nin: event.target.value.replace(/\D/g, '').slice(0, 11),
              })
            }
            placeholder="Enter your NIN"
            inputMode="numeric"
          />
          <label htmlFor="identity-type">Identity Document type</label>
          <select
            id="identity-type"
            className="large-input form-select"
            value={docType}
            onChange={(event) => setDocType(event.target.value)}
          >
            <option value="">Choose Identity Document type</option>
            <option>National ID Card</option>
            <option>International Passport</option>
            <option>Driver’s Licence</option>
            <option>Voters Card</option>
          </select>
          <label htmlFor="id-number">Identity Document number</label>
          <input
            id="id-number"
            className="large-input"
            value={fields.idNumber}
            onChange={(event) =>
              setFields({ ...fields, idNumber: event.target.value })
            }
            placeholder="Enter the Identity Document number"
          />
          <div className="identity-uploads">
            <UploadBox
              label="Upload your Identity Document (Front)"
              file={files.front}
              onFile={(front) => setFiles({ ...files, front })}
              required
            />
            <UploadBox
              label="Back"
              file={files.back}
              onFile={(back) => setFiles({ ...files, back })}
              required
            />
          </div>
          <div className="utility-upload">
            <UploadBox
              label="Upload your Utility Bill"
              file={files.utility}
              onFile={(utility) => setFiles({ ...files, utility })}
              required
            />
          </div>
          <p className="upload-disclaimer">
            Document must be clear, legible and genuine. Upload uprightly
          </p>
          <div className="consent-checks">
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
              <a onClick={() => onOpenLegal('terms')}>
                Accept Terms &amp; Conditions
              </a>
            </label>
            <label>
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(event) => setConsentAccepted(event.target.checked)}
              />
              <a onClick={() => onOpenLegal('consent')}>
                Personal Data Processing Consent
              </a>
            </label>
          </div>
          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}
          <button className="update-button" type="submit">
            Update
          </button>
        </form>
      </main>
    </>
  )
}

export default UpdateForm
