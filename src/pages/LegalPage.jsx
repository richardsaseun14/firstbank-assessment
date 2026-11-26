import React from 'react'
import clsx from 'clsx'
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js'
import PortalHeader from '../components/PortalHeader.jsx'
import Button from '../components/ui/Button.jsx'

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
      {page === 'terms' ? (
        <PortalHeader terms={termsAccepted} setTerms={setTermsAccepted} />
      ) : (
        <PortalHeader />
      )}
      <main
        className={clsx('container', 'container--legal', 'legal-page', {
          'legal-page--consent': page === 'consent',
        })}
      >
        {page === 'terms' && (
          <Button
            className="legal-back"
            onClick={onBack}
            aria-label="Back to update form"
          >
            <Icon path={mdiArrowLeft} size={1} />
          </Button>
        )}
        {page === 'terms' ? (
          <>
            <h1 className="legal-page__title">
              Account Maintenance Terms and Conditions
            </h1>
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
            <h1 className="legal-page__title">
              PERSONAL DATA PROCESSING CONSENT FORM
            </h1>
            <h2 className="legal-page__subtitle">
              Kindly read and accept the following conditions to proceed
            </h2>
            <p>
              To enable First Bank of Nigeria Limited (“FirstBank”) provide you
              with its products and services, you hereby fully authorize
              FirstBank and its affiliates in the FBN Holdings Plc Group to
              collect, record, use, share, store, process and disclose all
              information (including Personal Data and Sensitive Personal Data
              as defined in the Nigeria Data Protection Act, 2023 and other
              applicable Data protection laws/regulations) relating to you and
              your accounts, including, without limitation, any personal data,
              information obtained from you or from third parties, usage of your
              account(s), transactions/payments conducted on your account(s),
              references provided and any other credit information maintained
              with or obtained by FirstBank and its affiliates in the FBN
              Holdings Plc Group (including those obtained from credit reference
              agencies).
            </p>
            <p>
              You further authorize FirstBank and its affiliates in the FBN
              Holdings Plc Group to use your information to manage and
              administer your account, to share your information with service
              providers, debt collection agencies, third-party partners, third
              party intermediaries, statutory, governmental or regulatory
              bodies, credit reference and fraud prevention agencies and tax
              authorities.
            </p>
            <p>
              You acknowledge and agree that any such sharing or transfer of
              information will be on a confidential basis and according to the
              provisions of the Nigerian Data Protection Act, 2023. For more
              information on our privacy policy, please visit
              https://www.firstbanknigeria.com/home/legal/privacy-policy/
            </p>
            <p>
              If you wish to withdraw your consent or have concerns relating to
              the processing of your personal information, you may do so at any
              time by notifying us through firstcontact@firstbankgroup.com or
              dataprotectionoffice@firstbankgroup.com. We will respond to your
              concerns within 30 days of receiving your notice.
            </p>
            <p>
              You hereby confirm that you have read and understood the content
              of this consent form. You hereby grant your consent to FirstBank
              of Nigeria Ltd of 35 Marina, Lagos to process your Information
              including Personal Data and Sensitive Personal Data.
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
