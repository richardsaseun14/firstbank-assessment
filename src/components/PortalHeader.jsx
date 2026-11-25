import React from 'react'
import Icon from '@mdi/react'
import { mdiHeadset, mdiMagnify } from '@mdi/js'
import Button from './ui/Button.jsx'

function PortalHeader({ terms, setTerms, onOpenTerms }) {
  return (
    <>
      <header className="site-header">
        <div className="container container--wide site-header-inner">
          <a className="firstbank-logo" href="#home" aria-label="FirstBank home">
            <img src="/firstbank-logo.png" alt="FirstBank since 1894" />
          </a>
          {terms !== undefined && (
            <label className="terms-header-check">
              <input
                type="checkbox"
                checked={terms}
                onChange={(event) => setTerms(event.target.checked)}
              />
              <a onClick={onOpenTerms}>Accept Terms &amp; Conditions</a>
            </label>
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
        <div className="container container--wide">Account Management Portal</div>
      </div>
    </>
  )
}

export default PortalHeader
