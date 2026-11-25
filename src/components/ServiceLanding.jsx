import React from 'react'
import Icon from '@mdi/react'
import {
  mdiAccountSwitchOutline,
  mdiAccountArrowUpOutline,
  mdiHomeEditOutline,
  mdiCalendarEdit,
  mdiAccountReactivateOutline,
  mdiEmailEditOutline,
  mdiCardAccountDetailsOutline,
  mdiCellphoneCog,
  mdiCardAccountDetails,
} from '@mdi/js'
import { mdiCheck } from '@mdi/js'
import PortalHeader from './PortalHeader.jsx'
import PortalFooter from './PortalFooter.jsx'

const services = [
  [
    'Account Conversion/ Migration',
    [
      'BVN',
      'NIN',
      'Proof of Identity (Notarized if applicable)',
      'Proof of Address (Notarized if applicable)',
    ],
    'Convert your account',
    mdiAccountSwitchOutline,
  ],
  [
    'Account Upgrade (Tier 1 and 2)',
    ['BVN', 'NIN', 'Proof of Identity'],
    'Upgrade Tier 1 or Tier 2 account',
    mdiAccountArrowUpOutline,
  ],
  [
    'Address Update',
    ['BVN', 'NIN', 'Proof of Identity', 'Proof of Address'],
    'Update address',
    mdiHomeEditOutline,
  ],
  [
    'Date of Birth Update',
    ['BVN', 'Valid ID Card', 'Proof of Identity or Court Affidavit'],
    'Update your date of birth',
    mdiCalendarEdit,
  ],
  [
    'Dormant Account Reactivation',
    [
      'BVN',
      'NIN',
      'Proof of Identity (Notarized if applicable)',
      'Proof of Address (Notarized if applicable)',
    ],
    'Reactivate an account',
    mdiAccountReactivateOutline,
  ],
  [
    'Email Update',
    ['BVN', 'NIN'],
    'Update your email address',
    mdiEmailEditOutline,
  ],
  [
    'Identity Document Update',
    ['BVN', 'NIN', 'Proof of Identity'],
    'Update identification document',
    mdiCardAccountDetailsOutline,
  ],
  [
    'Phone Number Update',
    ['BVN', 'NIN'],
    'Update your phone number',
    mdiCellphoneCog,
  ],
  [
    'BVN Update',
    ['Proof of identity', 'Affidavit'],
    'Update your BVN',
    mdiCardAccountDetails,
  ],
]

function ServiceLanding({ onSelectIdentity }) {
  return (
    <>
      <PortalHeader />
      <main className="landing-main">
        <p className="landing-prompt">
          Kindly select an account management service
        </p>
        <div className="service-grid">
          {services.map(([title, requirements, action, icon]) => (
            <article className="service-card" key={title}>
              <span className="service-icon">
                <Icon path={icon} size={1.25} />
              </span>
              <h2>{title}</h2>
              <ul>
                {requirements.map((item) => (
                  <li key={item}>
                    <Icon path={mdiCheck} size={0.9} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#identity-update"
                onClick={(event) => {
                  event.preventDefault()
                  if (title === 'Identity Document Update') onSelectIdentity()
                }}
              >
                {action}
              </a>
            </article>
          ))}
        </div>
      </main>
      <PortalFooter />
    </>
  )
}

export default ServiceLanding
