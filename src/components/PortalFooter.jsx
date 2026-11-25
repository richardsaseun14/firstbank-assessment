import React from 'react'
import Icon from '@mdi/react'
import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiYoutube } from '@mdi/js'

const columns = [
  [
    'BANKING',
    'Corporate Information',
    'Personal Banking',
    'Business Banking',
    'Private Banking',
    'Loan Calculator',
    'Vendor Portal',
    'Download Forms',
    'USSD',
    'Update BVN/NIN',
  ],
  ['SECURITY', 'BVN', 'Anti-Fraud', 'Security Tips', 'Secure Code'],
  [
    'CONTACT US',
    'Feedback and Complaints',
    'Whistleblowing',
    'Find a Branch',
    'Contact Form',
    'Find an Agent',
    'Agent Network',
  ],
  [
    'LEGAL',
    'Sitemap',
    'Terms of Use',
    'Privacy Policy',
    'Cookies Policy',
    'Communications Policy',
    'Information and Cybersecurity Policy',
  ],
]

function PortalFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-emblem">♞</span>
          <select aria-label="Language">
            <option>English</option>
          </select>
        </div>
        <div className="social-links" aria-label="Social links">
          <a href="#facebook" aria-label="Facebook">
            <Icon path={mdiFacebook} size={0.75} />
          </a>
          <a href="#x" aria-label="X">
            𝕏
          </a>
          <a href="#instagram" aria-label="Instagram">
            <Icon path={mdiInstagram} size={0.75} />
          </a>
          <a href="#youtube" aria-label="YouTube">
            <Icon path={mdiYoutube} size={0.75} />
          </a>
          <a href="#linkedin" aria-label="LinkedIn">
            <Icon path={mdiLinkedin} size={0.75} />
          </a>
        </div>
        <div className="footer-rule" />
        <div className="footer-cols">
          {columns.map(([title, ...items]) => (
            <div key={title}>
              <b>{title}</b>
              {items.map((item) => (
                <a href="#" key={item}>
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-rule bottom-rule" />
        <div className="copyright">
          © 2024 First Bank of Nigeria Ltd. An FBN Holdings Company. Licensed by
          the Central Bank of Nigeria
        </div>
      </div>
    </footer>
  )
}

export default PortalFooter
