import React from 'react'
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js'
import PortalHeader from './PortalHeader.jsx'
import Button from './ui/Button.jsx'

const termsText = [
  'I, [Your Full Name or Legal Entity Name], hereby provide my consent to FirstBank to update my account information.',
  'I understand and agree that the information provided for this account maintenance request is true, accurate, and complete to the best of my knowledge.',
  'I authorize the Bank to conduct any necessary checks and verifications to assess my request and confirm my identity.',
  'I am aware that the account may be subject to applicable fees, charges, and terms as outlined by the Bank.',
  'I understand that the Bank may provide electronic statements, notices, and other communications related to my account.',
  'I acknowledge that my account may be governed by the laws and regulations of the jurisdiction in which the Bank operates.',
  'I understand that the Bank may update its terms and conditions from time to time, and I agree to be bound by revised terms upon notification.',
  'I further authorize the Bank to disclose information related to my account to its affiliates, agents, and regulatory authorities as required by law.',
]

function LegalPage({
  page,
  termsAccepted,
  setTermsAccepted,
  onBack,
  onAgree,
  onReject,
}) {
  return (
    <>
      <PortalHeader
        terms={termsAccepted}
        setTerms={setTermsAccepted}
        onOpenTerms={() => {}}
      />
      <main className="legal-page">
        <Button
          className="legal-back"
          onClick={onBack}
          aria-label="Back to update form"
        >
          <Icon path={mdiArrowLeft} size={1} />
        </Button>
        {page === 'terms' ? (
          <>
            <h1>Account Maintenance Terms and Conditions</h1>
            {termsText.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <p>
              By proceeding, I acknowledge that I have read and understood these
              terms and consent to the requested account update with FirstBank.
            </p>
          </>
        ) : (
          <>
            <h1>PERSONAL DATA PROCESSING CONSENT FORM</h1>
            <h2>Kindly read and accept the following conditions to proceed</h2>
            <p>
              To enable First Bank of Nigeria Limited (“FirstBank”) provide you
              with its products and services, you hereby fully authorize
              FirstBank and its affiliates in the FBN Holdings Plc Group to
              collect, record, use, share, store, process and disclose
              information relating to you and your accounts, including personal
              data obtained from you or third parties, and usage of your
              account(s).
            </p>
            <p>
              You further authorize FirstBank and its affiliates to use your
              information to manage and administer your account, and to share
              your information with service providers, debt collection agencies,
              third-party partners, statutory, governmental or regulatory
              bodies, credit reference and fraud prevention agencies and tax
              authorities.
            </p>
            <p>
              You acknowledge and agree that any such sharing or transfer of
              information will be on a confidential basis and according to the
              provisions of the Nigeria Data Protection Act, 2023. For more
              information on our privacy policy, please visit the FirstBank
              website.
            </p>
            <p>
              If you wish to withdraw your consent or have concerns relating to
              the processing of your personal information, you may do so at any
              time by notifying FirstBank through its official contact channels.
            </p>
            <p>
              You hereby confirm that you have read and understood the content
              of this consent form. You grant your consent to FirstBank of
              Nigeria Ltd to process your information, including personal data
              and sensitive personal data, to support this account maintenance
              request.
            </p>
          </>
        )}
        <div className="legal-actions">
          <Button variant="outline" onClick={onReject}>
            I Reject
          </Button>
          <Button variant="primary" onClick={onAgree}>
            I Agree
          </Button>
        </div>
      </main>
    </>
  )
}

export default LegalPage
