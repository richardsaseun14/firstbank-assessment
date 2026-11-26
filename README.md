# Identity Document Update Portal

A React prototype of the identity document update flow from the Digital Account Maintenance case study. A customer confirms their account with an OTP, enters their identity details, uploads their documents and submits the request.

All bank calls are mocked. No OTPs are sent, no files are uploaded and no account is changed.

## Quick start

Requires Node 22 (set in `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

Demo values:

| Field          | Value                                                                                  |
| -------------- | -------------------------------------------------------------------------------------- |
| Account number | `1234567890` (any 10 digits except all zeros)                                          |
| OTP            | `123456`                                                                               |
| NIN            | Any 11 digits. The last four pick the mock result (see [Mock results](#mock-results)). |

## Scripts

| Command                | What it does                      |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the dev server              |
| `npm run build`        | Build for production into `dist/` |
| `npm run preview`      | Serve the production build        |
| `npm run lint`         | Run ESLint                        |
| `npm run format`       | Format all files with Prettier    |
| `npm run format:check` | Check formatting without writing  |

## Tech stack

- React 18 and Vite 6
- React Router 6 for routing
- Formik for form state and Zod for validation rules
- Material Design Icons (`@mdi/js`, `@mdi/react`)
- ESLint and Prettier

## User flow

1. **Service list (`/`).** The customer selects "Update identification document". The other service cards are placeholders and do nothing.
2. **Data processing consent (`/identity-update/consent`).** The customer must agree before verification. "I Reject" or Back returns to the service list. Opening `/identity-update` directly redirects here first.
3. **Account verification (`/identity-update`).**
   - Entering 10 digits looks up the account automatically. A spinner shows while it loads.
   - When the account is found, the masked phone number and email appear, with six OTP boxes.
   - The code is checked as soon as all six digits are entered. Pasting a code fills the boxes.
   - "Resend OTP" is available after 59 seconds.
   - A correct code shows a check mark and the form opens one second later. Changing the account number in that second cancels it.
4. **Update form (same URL).** The customer enters:
   - NIN (11 digits)
   - Identity document type and number
   - Identity document upload: front and back for an international passport, one file for every other type. Changing the type clears these files.
   - Utility bill upload (always required)
   - Terms and conditions acceptance. "Accept Terms & Conditions" opens the terms page (`/identity-update/terms`), where "I Agree" ticks the box and "I Reject" clears it.
5. **Submit.** The request takes about one second, and the button shows "Submitting…". A dialog then shows one of three results:
   - **Success:** the request is in progress.
   - **Failure:** the customer is asked to visit a branch.
   - **Outstanding information:** "Complete now" adds an Outstanding Information section to the form. Occupation and Nature of Business are required; employer name, employer address and annual turnover are optional. Submitting again completes the request.
6. **Home** returns to the service list and clears everything entered.

## Mock results

`src/services/MockBankServer.js` simulates the bank API with short delays: account lookup 1.2 s, OTP check 0.5 s, submission 1 s.

The submission result comes from the last four digits of the NIN:

| Example NIN   | Result                  |
| ------------- | ----------------------- |
| `12345671111` | Success                 |
| `12345672222` | Failure                 |
| `12345673333` | Outstanding information |
| Anything else | Success                 |

A URL parameter overrides the NIN. Add it to the service list URL and it is kept for the whole flow:

- `?mockResult=success`
- `?mockResult=failure`
- `?mockResult=additional-document`
- `?simulateFailure=1` (same as `mockResult=failure`)

To connect a real backend, replace `MockBankServer` with an API client that has the same three methods: `confirmAccountAndSendOtp`, `verifyOtp` and `submitIdentityUpdate`.

## Validation and error handling

| Situation                          | What the user sees                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Invalid form field                 | A message under the field after the user leaves it or submits. Rules are in `src/formSchema.js`.                 |
| Wrong file type or file over 10 MB | A message under the upload box. PDF, JPG and PNG are accepted.                                                   |
| Account not found (`0000000000`)   | A message under the account number.                                                                              |
| Wrong OTP                          | A message under the OTP boxes, with "Cancel Request" to clear them.                                              |
| Submission failure                 | The failure dialog.                                                                                              |
| Unexpected render error            | `ErrorBoundary` shows "Something went wrong" with "Try again" and "Return to services", instead of a blank page. |

Responses that arrive after the user has changed the account number or OTP are ignored, so an old response cannot overwrite newer input.

Form fields and upload boxes are linked to their labels and error messages for screen readers. Invalid text fields, selects and the terms checkbox are marked with `aria-invalid`.

## Project structure

```
src/
  main.jsx                      Mounts the app inside ErrorBoundary and BrowserRouter
  App.jsx                       Top-level routes; lazy-loads the identity update flow
  formSchema.js                 Zod validation rules for both forms
  index.css                     All styles
  contexts/
    IdentityUpdateContext.jsx   Provider: flow state and actions (send OTP, verify, submit)
    identityUpdateContext.js    The React context object
    useIdentityUpdate.js        Hook for reading the context
  pages/
    ServiceLanding.jsx          Service list
    IdentityUpdateRoute.jsx     Lazy-loaded entry; wraps the flow in the provider
    IdentityUpdateFlow.jsx      Routes and navigation inside /identity-update
    VerificationPage.jsx        Account lookup and OTP
    UpdateForm.jsx              Identity details, uploads, terms, submit
    LegalPage.jsx               Terms and consent pages
  components/
    ErrorBoundary.jsx           Recovery screen for render errors
    PageLoader.jsx              Spinner shown while a lazy chunk loads
    PortalHeader.jsx            Header and portal title bar
    PortalFooter.jsx            Footer
    ResultModal.jsx             Submission result dialog
    UploadBox.jsx               File picker, drag and drop, file checks, remove
    ui/Button.jsx               Shared button with style variants
    ui/FormField.jsx            Formik field with label and error message
    ui/OtpInput.jsx             Six-box OTP input with paste support
  services/
    MockBankServer.js           Simulated bank API
```

## State management

- **Flow state** (account, OTP status, consent, terms, form draft, result) lives in `IdentityUpdateProvider`. The provider wraps only the `/identity-update/*` routes. It stays mounted while the customer moves between verification, terms and consent, and unmounts on return to the service list, which clears the data.
- **Form state** is handled by Formik inside each page. The update form copies its values to the provider as they change, so they survive a visit to the terms page. It reads them back only when it mounts. It does not use `enableReinitialize`, because that would reset error messages on every keystroke.
- Another service, such as Address Update, can get its own provider and routes without sharing this state.

## Performance

The identity update flow, including Formik and Zod, is a separate chunk loaded with `React.lazy` when the customer leaves the service list. `PageLoader` shows while it downloads.

Production build, gzipped:

| File                  | Size    |
| --------------------- | ------- |
| Initial JS            | 63.7 KB |
| Identity update chunk | 43.6 KB |
| CSS                   | 4.3 KB  |

## Responsive layout

Breakpoints are at 1400 px, 850 px and 600 px. Shared container classes in `src/index.css` set the width and side margins for each type of page:

- `.container--wide`: header, title bar, service list
- `.container--narrow`: verification and update forms
- `.container--legal`: terms and consent text
- `.container--footer`: footer

## Shared button

`src/components/ui/Button.jsx` is used for every button. Pick a style with `variant`: `primary`, `outline`, `update`, `back`, `icon`, `help`, `continue` or `upload`. It defaults to `type="button"`, so only the Update button submits the form.

```jsx
<Button variant="primary" onClick={acceptTerms}>
  I Agree
</Button>
```

## Limitations

- The bank API is mocked (see [Mock results](#mock-results)).
- State is kept in memory, so refreshing the page restarts the flow.
- Only the identity document update service is built.
- There are no automated tests yet.
