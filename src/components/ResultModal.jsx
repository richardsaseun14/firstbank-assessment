import React from 'react'
import Icon from '@mdi/react'
import { mdiCheckCircleOutline, mdiClose } from '@mdi/js'
import Button from './ui/Button.jsx'

function ResultModal({ type, onClose, onHome, onComplete }) {
  if (!type) return null
  return (
    <div className="modal-scrim" role="presentation">
      <section
        className={`result-modal${type === 'additional-document' ? ' result-modal--outstanding' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
      >
        {type === 'additional-document' ? (
          <>
            <h2 id="result-title">
              Please proceed to update information on your account
            </h2>
            <ul className="outstanding-list">
              <li>
                Occupation (
                <strong>
                  <em>compulsory</em>
                </strong>
                <span>*</span>)
              </li>
              <li>
                Nature of Business (
                <strong>
                  <em>compulsory</em>
                </strong>
                <span>*</span>)
              </li>
              <li>Employer Name</li>
              <li>Employer Address</li>
              <li>Annual Turn-Over</li>
            </ul>
            <div className="result-actions">
              <Button variant="primary" onClick={onComplete}>
                Complete now
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
