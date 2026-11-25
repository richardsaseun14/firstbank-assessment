import React from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js'
import PortalHeader from '../components/PortalHeader.jsx'
import UploadBox from '../components/UploadBox.jsx'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import { validateUpdateForm } from '../formSchema.js'

function UpdateFormFields({
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
    setFields({ nin: values.nin, idNumber: values.idNumber })
    setDocType(values.docType)
    setFiles(values.files)
    setTermsAccepted(values.termsAccepted)
    setConsentAccepted(values.consentAccepted)
  }, [
    values,
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
            disabled
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
              onFile={(front) => {
                setFieldTouched('files.front', true)
                setFieldValue('files.front', front)
              }}
              validationError={touched.files?.front && errors.files?.front}
              required
            />
            <UploadBox
              label="Back"
              file={values.files.back}
              onFile={(back) => {
                setFieldTouched('files.back', true)
                setFieldValue('files.back', back)
              }}
              validationError={touched.files?.back && errors.files?.back}
              required
            />
          </div>
          <div className="utility-upload">
            <UploadBox
              label="Upload your Utility Bill"
              file={values.files.utility}
              onFile={(utility) => {
                setFieldTouched('files.utility', true)
                setFieldValue('files.utility', utility)
              }}
              validationError={touched.files?.utility && errors.files?.utility}
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
            {touched.termsAccepted && errors.termsAccepted && (
              <span className="upload-error" role="alert">
                {errors.termsAccepted}
              </span>
            )}
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
            {touched.consentAccepted && errors.consentAccepted && (
              <span className="upload-error" role="alert">
                {errors.consentAccepted}
              </span>
            )}
          </div>
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
