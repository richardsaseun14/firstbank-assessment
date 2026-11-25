import React, { useState } from 'react'
import clsx from 'clsx'
import Icon from '@mdi/react'
import {
  mdiFacebook,
  mdiInstagram,
  mdiLinkedin,
  mdiYoutube,
  mdiAlphaX,
  mdiWhatsapp,
} from '@mdi/js'
import Button from './ui/Button.jsx'

const languages = [
  ['ar', 'Arabic'],
  ['zh-CN', 'Chinese (Simplified)'],
  ['zh-TW', 'Chinese (Traditional)'],
  ['nl', 'Dutch'],
  ['en', 'English'],
  ['fr', 'French'],
  ['de', 'German'],
  ['ha', 'Hausa'],
  ['ig', 'Igbo'],
  ['it', 'Italian'],
  ['pt', 'Portuguese'],
  ['ru', 'Russian'],
  ['es', 'Spanish'],
  ['yo', 'Yoruba'],
]

const columns = [
  [
    'Banking',
    [
      ['Corporate Information', 'https://firstbankgroup.com/ng/home/'],
      ['Personal Banking', 'https://firstbankgroup.com/ng/'],
      ['Business Banking', 'https://firstbankgroup.com/ng/business/'],
      ['Private Banking', 'https://www.firstbankprivatebanking.com/'],
      [
        'Loan Calculator',
        'https://firstbankgroup.com/ng/personal/loans/#calculator',
      ],
      [
        'Vendor Portal',
        'https://firstbankgroup.com/ng/vendor-information-portal/',
      ],
      [
        'Download Forms',
        'https://firstbankgroup.com/ng/personal/download-forms/',
      ],
      ['USSD', 'https://firstbankgroup.com/ng/personal/ways-to-bank/ussd/'],
      ['Update BVN/NIN', 'https://linknin.firstbanknigeria.com/'],
    ],
  ],
  [
    'Security',
    [
      ['BVN', 'https://firstbankgroup.com/ng/contact/bvn/'],
      [
        'Anti-Fraud',
        'https://firstbankgroup.com/ng/contact/security/anti-fraud/',
      ],
      [
        'Security Tips',
        'https://firstbankgroup.com/ng/contact/security/security-tips/',
      ],
      [
        'Secure Code',
        'https://firstbankgroup.com/ng/contact/security/secure-code/',
      ],
    ],
  ],
  [
    'Contact Us',
    [
      [
        'Feedback and Complaints',
        'https://firstbankgroup.com/ng/contact/feedback-complaints/',
      ],
      [
        'Whistleblowing',
        'https://firstbankgroup.com/ng/wp-content/uploads/2025/11/Whistleblowing-Policy-2025.pdf',
      ],
      ['Find a Branch', 'https://firstbankgroup.com/ng/contact/find-a-branch/'],
      ['Contact Form', 'https://firstbankgroup.com/ng/contact/'],
      [
        'Find an Agent',
        'https://www.google.com/maps/search/firstmonie+locations/',
      ],
      [
        'Agent Network',
        'https://firstbankgroup.com/ng/wp-content/uploads/2021/03/firstmonie-agents.pdf',
      ],
      [
        'Economic Outlook',
        'https://firstbankgroup.com/ng/business/nigeria-economic-outlook/',
      ],
    ],
  ],
  [
    'Legal',
    [
      ['Sitemap', 'https://firstbankgroup.com/ng/sitemap/'],
      [
        'Terms of Use',
        'https://firstbankgroup.com/ng/home/legal/terms-of-use/',
      ],
      [
        'Privacy Policy',
        'https://firstbankgroup.com/ng/home/legal/privacy-policy/',
      ],
      [
        'Cookies Policy',
        'https://firstbankgroup.com/ng/home/legal/cookies-policy/',
      ],
      [
        'Communications Policy',
        'https://firstbankgroup.com/ng/wp-content/uploads/2026/11/FirstBank-Communications-Policy.pdf',
      ],
      [
        'Information and Cybersecurity Policy',
        'https://firstbankgroup.com/ng/wp-content/uploads/2026/01/Information-Cybersecurity-Policy.pdf',
      ],
      [
        'More Policies',
        'https://firstbankgroup.com/ng/home/legal/more-policies/',
      ],
    ],
  ],
]

const socials = [
  ['Facebook', 'https://www.facebook.com/firstbankofnigeria', mdiFacebook],
  ['X', 'https://twitter.com/firstbankngr', mdiAlphaX],
  ['Instagram', 'http://instagram.com/firstbanknigeria', mdiInstagram],
  ['YouTube', 'https://www.youtube.com/user/firstbankngr', mdiYoutube],
  [
    'LinkedIn',
    'https://www.linkedin.com/company/first-bank-of-nigeria-ltd/',
    mdiLinkedin,
  ],
]

function PortalFooter() {
  const [shareOpen, setShareOpen] = useState(false)
  const pageUrl = encodeURIComponent(window.location.href)
  const shareOptions = [
    [
      'Facebook',
      `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      mdiFacebook,
    ],
    ['Twitter', `https://twitter.com/intent/tweet?url=${pageUrl}`, mdiAlphaX],
    [
      'LinkedIn',
      `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      mdiLinkedin,
    ],
    ['WhatsApp', `https://api.whatsapp.com/send?text=${pageUrl}`, mdiWhatsapp],
  ]

  return (
    <>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-topline">
            <div className="footer-brand">
              <img
                className="footer-emblem"
                src="/firstbank-symbol.svg"
                alt="FirstBank emblem"
              />
              <select aria-label="Select language" defaultValue="en">
                <option value="">Select Language</option>
                {languages.map(([code, language]) => (
                  <option value={code} key={code}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="social-links" aria-label="Social links">
              {socials.map(([label, href, icon]) => (
                <a
                  href={href}
                  key={label}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon path={icon} size={0.75} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-rule" />
          <div className="footer-cols">
            {columns.map(([title, links]) => (
              <div key={title}>
                <b className="footer-col-title">{title}</b>
                {links.map(([label, href]) => (
                  <a href={href} key={label} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className={clsx('footer-rule', 'bottom-rule')} />
          <div className="footer-bottom">
            <div className="copyright">
              © 2026. First Bank of Nigeria Ltd. A FirstHoldCo Company. Licensed
              by the Central Bank of Nigeria
            </div>
            <a className="back-to-top" href="#top">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>
      <div className="share-widget">
        {shareOpen && (
          <div
            className="share-platforms"
            id="share-platforms"
            role="group"
            aria-label="Share this page"
          >
            {shareOptions.map(([label, href, icon]) => (
              <a
                href={href}
                key={label}
                aria-label={`Share on ${label}`}
                title={`Share on ${label}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShareOpen(false)}
              >
                <Icon path={icon} size={1} />
              </a>
            ))}
          </div>
        )}
        <Button
          className="footer-share"
          type="button"
          aria-expanded={shareOpen}
          aria-controls="share-platforms"
          onClick={() => setShareOpen((open) => !open)}
        >
          Share
        </Button>
      </div>
    </>
  )
}

export default PortalFooter
