# FirstBank account maintenance prototype

React and Vite prototype based on the case study and attached screen references.

## Run

Run npm install, then npm run dev.

## Included flow

- Account management service landing page
- Consent screen before identity update account verification
- Account number and six digit OTP verification (demo code: 123456)
- Identity document update form with NIN, document type and number fields
- Front and back identity document uploads plus utility bill upload
- File type and 10 MB size validation, drag and drop, remove and replace
- Account maintenance terms and data processing consent screens
- Form validation and successful submission dialog

## Routing and code structure

This is a React single-page application. `BrowserRouter` in `src/main.jsx` reads the browser URL and lets React Router render the matching screen without reloading the document. `src/App.jsx` routes the landing page and mounts the identity update provider; `src/pages/IdentityUpdateFlow.jsx` maps the identity update URLs to page components:

- `/` — service selection
- `/identity-update/verify` — account confirmation and OTP, followed by identity details and document uploads on the same page
- `/identity-update/terms` — account maintenance terms
- `/identity-update/consent` — personal data consent

`App.jsx` keeps the service landing page outside the identity update process. The `/identity-update/*` routes are wrapped in `IdentityUpdateProvider`, which owns that process's account, OTP, form, upload, consent, and submission state. The provider stays mounted while navigating between identity update routes, so entered values persist. Other service flows can use separate providers without sharing this state.

`IdentityUpdateFlow.jsx` connects the process routes to the provider through `useIdentityUpdate()`. The context and hook live in `src/contexts/identityUpdateContext.js` and `src/contexts/useIdentityUpdate.js`; the provider and process actions live in `src/contexts/IdentityUpdateContext.jsx`.

### Mock account and OTP API

`src/services/MockBankServer.js` contains the class used to simulate account and OTP calls. Entering a 10 digit account number starts `confirmAccountAndSendOtp()`. The account input shows a loader while the mock call waits, then the OTP instructions and inputs appear if the account is accepted. The mock accepts any 10 digit number except `0000000000` and returns sample account and masked contact details. Resending the OTP uses the same mock method.

Entering the sixth OTP digit calls `verifyOtp()` automatically. The mock accepts `123456` and rejects other codes. An incorrect code shows an error below the inputs. A correct code replaces the resend prompt with a check mark; after two seconds, the identity fields appear on the same page. These calls do not contact a bank or send real messages; replace the mock class with a real API client when a backend is available.

Screen components live in `src/pages/`; reusable UI and layout components live in `src/components/`. The component responsibilities are:

- `pages/ServiceLanding.jsx`: service cards and landing page composition.
- `pages/IdentityUpdateFlow.jsx`: route composition and navigation for the identity update process.
- `pages/VerificationPage.jsx`: account lookup feedback, OTP instructions, and verification flow.
- `pages/UpdateForm.jsx`: identity details, uploads, consent controls, and submit action.
- `pages/LegalPage.jsx`: terms and data consent screens.
- `components/ui/OtpInput.jsx`: six digit OTP entry UI and focus movement.
- `components/UploadBox.jsx`: file chooser, drag-and-drop, file validation, and removal.
- `components/PortalHeader.jsx`, `PortalFooter.jsx`, `ResultModal.jsx`: shared page chrome and submission feedback.
- `components/ui/FormField.jsx`: reusable Formik field with inline validation feedback.
- `formSchema.js`: Zod schemas and Formik validation adapters.

Icons come from the Material Design Icons package (`@mdi/js` path data rendered with `@mdi/react`).

### UI atoms: Button

`src/components/ui/Button.jsx` is the shared button primitive. Use its `variant` prop to apply an established portal style (`primary`, `outline`, `update`, `back`, `icon`, `help`, `continue`, or `upload`) instead of creating a one-off button implementation. It defaults to `type="button"`, which prevents buttons inside forms from submitting by accident; the form's Update action explicitly opts into `type="submit"`. It also forwards standard button props such as `onClick`, `disabled`, and `aria-label`.

Example:

```jsx
<Button variant="primary" onClick={acceptTerms}>
  I Agree
</Button>
```

The button variants map to the existing portal CSS classes, so the shared component standardizes behavior while the styles remain in `src/index.css`.

### Layout containers

`src/index.css` defines a reusable `.container` class for centered content with a maximum width and responsive side gutters. The header, portal title bar, and landing service content share `.container--wide`; the footer has its own `.container--footer`. Verification and update forms use `.container--narrow`, while long legal copy uses `.container--legal` for comfortable reading. The gutters adjust at tablet and mobile breakpoints, so each page does not need its own width and margin calculations.

Example: `className="container container--narrow verification-page"` uses the shared layout sizing, while `verification-page` keeps its page-specific vertical spacing.

The project uses mock account and verification details. It does not send real OTPs, save uploaded files, or submit account changes to a banking service.

Open the app with the query string simulateFailure=1 to view the failed submission state.
