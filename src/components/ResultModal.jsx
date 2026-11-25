import React from 'react'
import Icon from '@mdi/react'
import { mdiCheckCircleOutline, mdiClose } from '@mdi/js'

function ResultModal({ type, onClose, onHome }) {
  if (!type) return null
  return (
    <div className="modal-scrim" role="presentation">
      <section
        className="result-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
      >
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
          <button className="outline-action" onClick={onClose}>
            Close
          </button>
          <button className="navy-action" onClick={onHome}>
            Home
          </button>
        </div>
      </section>
    </div>
  )
}

export default ResultModal
