import React from 'react'
import Icon from '@mdi/react'
import { mdiCheckCircleOutline, mdiClose, mdiInformationOutline } from '@mdi/js'
import Button from './ui/Button.jsx'

function ResultModal({ type, onClose, onHome, onSkip, onUpload }) {
  if (!type) return null
  return (
    <div className="modal-scrim" role="presentation">
      <section
        className="result-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
      >
        {type === 'account-information' ? (
          <>
            <h2 id="result-title">
              Please proceed to update information on your account
            </h2>
            <p>
              Occupation (compulsory)
              <br />
              Nature of Business (compulsory)
              <br />
              Employer Name
              <br />
              Employer Address
              <br />
              Annual Turn-Over
            </p>
            <div className="result-actions">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" disabled>
                Complete now
              </Button>
            </div>
          </>
        ) : type === 'additional-document' ? (
          <>
            <Icon path={mdiInformationOutline} size={2.6} color="#1769ff" />
            <h2 id="result-title">Additional document required</h2>
            <p>Utility bill (less than six months)</p>
            <div className="result-actions">
              <Button variant="outline" onClick={onSkip}>
                Skip for now
              </Button>
              <Button variant="primary" onClick={onUpload}>
                Upload now
              </Button>
            </div>
          </>
        ) : (
          <>
            {type === 'success' ? (
              <Icon
                className="result-icon"
                path={mdiCheckCircleOutline}
                size={2.6}
              />
            ) : (
              <span className="failure-icon">
                <Icon path={mdiClose} size={1.8} />
              </span>
            )}
            <h2 id="result-title">
              {type === 'success'
                ? 'Submission successful'
                : 'Update request failed'}
            </h2>
            <p>
              {type === 'success'
                ? 'Your update request is in progress. It will be treated within 24 hours.'
                : 'Your update request could not be completed. Please visit the nearest branch.'}
            </p>
            <div className="result-actions">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" onClick={onHome}>
                Home
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default ResultModal
