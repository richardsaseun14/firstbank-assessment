import React from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js'
import PortalHeader from './PortalHeader.jsx'
import UploadBox from './UploadBox.jsx'
import Button from './ui/Button.jsx'
import FormField from './ui/FormField.jsx'
import { validateUpdateForm } from '../formSchema.js'

function UpdateFormFields({
  setAccount,
  setFields,
  setDocType,
  setFiles,
  termsAccepted,
  setTermsAccepted,
  setConsentAccepted,
  onBack,
  onOpenLegal,
}) {
  const {
    values,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    handleSubmit,
  } = useFormikContext()
  React.useEffect(() => {
    setAccount(values.account)
    setFields({ nin: values.nin, idNumber: values.idNumber })
    setDocType(values.docType)
    setFiles(values.files)
    setTermsAccepted(values.termsAccepted)
    setConsentAccepted(values.consentAccepted)
  }, [
    values,
    setAccount,
    setFields,
    setDocType,
    setFiles,
    setTermsAccepted,
    setConsentAccepted,
  ])

  return (
    <>
      <PortalHeader
        terms={termsAccepted}
        setTerms={setTermsAccepted}
        onOpenTerms={() => onOpenLegal('terms')}
      />
      <main className="container container--narrow update-page">
        <div className="update-title">
          <Button
            variant="back"
            onClick={onBack}
            aria-label="Back to verification"
          >
            <Icon path={mdiArrowLeft} size={1} />
          </Button>
          <h1>Identity Document Update</h1>
        </div>
        <div className="gold-rule" />
        <Form className="update-form" noValidate onSubmit={handleSubmit}>
          <FormField
            name="account"
            id="account-form"
            label="Account number"
            value={values.account}
            onChange={(event) =>
              setFieldValue(
                'account',
                event.target.value.replace(/\D/g, '').slice(0, 10),
              )
            }
            placeholder="Enter your 10-digits account number"
            inputMode="numeric"
            maxLength={10}
          />
          <FormField
            name="nin"
            label="NIN"
            value={values.nin}
            onChange={(event) =>
              setFieldValue(
                'nin',
                event.target.value.replace(/\D/g, '').slice(0, 11),
              )
            }
            placeholder="Enter your NIN"
            inputMode="numeric"
          />
          <FormField
            as="select"
            name="docType"
            id="identity-type"
            label="Identity Document type"
            className="large-input form-select"
            value={values.docType}
            onChange={(event) => setFieldValue('docType', event.target.value)}
          >
            <option value="">Choose Identity Document type</option>
            <option>National ID Card</option>
            <option>International Passport</option>
            <option>Driver’s Licence</option>
            <option>Voters Card</option>
          </FormField>
          <FormField
            name="idNumber"
            id="id-number"
            label="Identity Document number"
            value={values.idNumber}
            onChange={(event) => setFieldValue('idNumber', event.target.value)}
            placeholder="Enter the Identity Document number"
          />
          <div className="identity-uploads">
            <UploadBox
              label="Upload your Identity Document (Front)"
              file={values.files.front}
              onFile={(front) => setFieldValue('files.front', front)}
              required
            />
            <UploadBox
              label="Back"
              file={values.files.back}
              onFile={(back) => setFieldValue('files.back', back)}
              required
            />
          </div>
          <div className="utility-upload">
            <UploadBox
              label="Upload your Utility Bill"
              file={values.files.utility}
              onFile={(utility) => setFieldValue('files.utility', utility)}
              required
            />
          </div>
          <p className="upload-disclaimer">
            Document must be clear, legible and genuine. Upload uprightly
          </p>
          <div className="consent-checks">
            <label>
              <input
                type="checkbox"
                checked={values.termsAccepted}
                onBlur={() => setFieldTouched('termsAccepted', true)}
                onChange={(event) =>
                  setFieldValue('termsAccepted', event.target.checked)
                }
              />
              <a onClick={() => onOpenLegal('terms')}>
                Accept Terms &amp; Conditions
              </a>
            </label>
            <label>
              <input
                type="checkbox"
                checked={values.consentAccepted}
                onBlur={() => setFieldTouched('consentAccepted', true)}
                onChange={(event) =>
                  setFieldValue('consentAccepted', event.target.checked)
                }
              />
              <a onClick={() => onOpenLegal('consent')}>
                Personal Data Processing Consent
              </a>
            </label>
          </div>
          {Object.keys(errors).length > 0 &&
            Object.keys(touched).length > 0 && (
              <p className="form-error" role="alert">
                {Object.values(errors).find(
                  (error) => typeof error === 'string',
                ) ?? 'Review the form and try again.'}
              </p>
            )}
          <Button variant="update" type="submit">
            Update
          </Button>
        </Form>
      </main>
    </>
  )
}

function UpdateForm(props) {
  const initialValues = {
    account: props.account,
    nin: props.fields.nin,
    idNumber: props.fields.idNumber,
    docType: props.docType,
    files: props.files,
    termsAccepted: props.termsAccepted,
    consentAccepted: props.consentAccepted,
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur
      validate={validateUpdateForm}
      onSubmit={props.onSubmit}
    >
      <UpdateFormFields {...props} />
    </Formik>
  )
}

export default UpdateForm
