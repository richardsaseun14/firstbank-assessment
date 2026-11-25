# FirstBank account maintenance prototype

React and Vite prototype based on the case study and attached screen references.

## Run

Run npm install, then npm run dev.

## Included flow

- Account management service landing page
- Account number and six digit OTP verification (demo code: 123456)
- Identity document update form with NIN, document type and number fields
- Front and back identity document uploads plus utility bill upload
- File type and 10 MB size validation, drag and drop, remove and replace
- Account maintenance terms and data processing consent screens
- Form validation and successful submission dialog

## Routing and code structure

This is a React single-page application. `BrowserRouter` in `src/main.jsx` reads the browser URL and lets React Router render the matching screen without reloading the document. `Routes` and `Route` in `src/App.jsx` map the account-maintenance URLs to page components:

- `/` — service selection
- `/identity-update/verify` — account number and OTP
- `/identity-update/form` — identity details and document uploads
- `/identity-update/terms` — account maintenance terms
- `/identity-update/consent` — personal data consent

`App.jsx` is the workflow container. It owns account, OTP, form, file, consent, and submission state, then passes values and callbacks to focused components in `src/components/`. This keeps page markup modular while preserving entered values when users move between routes. `go()` centralizes navigation and clears form errors; `useNavigate()` updates the URL, and `useLocation()` reads the failure-demo query parameter.

The component responsibilities are:

- `ServiceLanding.jsx`: service cards and landing page composition.
- `VerificationPage.jsx`: OTP inputs and verification feedback.
- `UpdateForm.jsx`: identity details, uploads, consent controls, and submit action.
- `UploadBox.jsx`: file chooser, drag-and-drop, file validation, and removal.
- `LegalPage.jsx`: terms and data consent screens.
- `PortalHeader.jsx`, `PortalFooter.jsx`, `ResultModal.jsx`: shared page chrome and submission feedback.

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

`src/index.css` defines a reusable `.container` class for centered content with a maximum width and responsive side gutters. Size modifiers set the intended content width: `.container--wide` for the main site content, `.container--narrow` for the verification and update forms, `.container--legal` for legal copy, and `.container--footer` for footer content. The gutters adjust at tablet and mobile breakpoints, so each page does not need its own width and margin calculations.

Example: `className="container container--narrow verification-page"` uses the shared layout sizing, while `verification-page` keeps its page-specific vertical spacing.

The project uses mock account and verification details. It does not send OTPs, save uploaded files, or submit account changes to a banking service.

Open the app with the query string simulateFailure=1 to view the failed submission state.
