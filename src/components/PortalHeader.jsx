import React from 'react'
import clsx from 'clsx'
import Icon from '@mdi/react'
import { mdiHeadset, mdiMagnify } from '@mdi/js'
import Button from './ui/Button.jsx'

function PortalHeader({
  terms,
  setTerms,
  onOpenTerms,
  containerSize = 'wide',
}) {
  const containerClass = clsx('container', `container--${containerSize}`)
  return (
    <>
      <header className="site-header">
        <div className={clsx(containerClass, 'site-header-inner')}>
          <a
            className="firstbank-logo"
            href="#home"
            aria-label="FirstBank home"
          >
            <img src="/firstbank-logo.png" alt="FirstBank since 1894" />
          </a>
          {terms !== undefined && (
            <div className="terms-header-check">
              <input
                id="header-terms"
                type="checkbox"
                checked={terms}
                aria-labelledby="header-terms-text"
                onChange={(event) => setTerms(event.target.checked)}
              />
              {onOpenTerms ? (
                <Button
                  id="header-terms-text"
                  className="consent-link"
                  onClick={onOpenTerms}
                >
                  Accept Terms &amp; Conditions
                </Button>
              ) : (
                <label
                  id="header-terms-text"
                  htmlFor="header-terms"
                  className="terms-header-check__text"
                >
                  Accept Terms &amp; Conditions
                </label>
              )}
            </div>
          )}
          <div className="header-links">
            <a href="#open-account">Open a FirstBank account</a>
            <Button variant="icon" aria-label="Search">
              <Icon path={mdiMagnify} size={1} />
            </Button>
            <Button variant="help">
              <Icon path={mdiHeadset} size={1} /> Help
            </Button>
          </div>
        </div>
      </header>
      <div className="portal-band">
        <div className={containerClass}>Account Management Portal</div>
      </div>
    </>
  )
}

export default PortalHeader
