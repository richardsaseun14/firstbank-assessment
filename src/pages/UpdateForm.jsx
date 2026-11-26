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
  outstandingRequired,
  setDocType,
  setFiles,
  setTermsAccepted,
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
    isSubmitting,
  } = useFormikContext()

  React.useEffect(() => {
    setFields({ nin: values.nin, idNumber: values.idNumber })
    setDocType(values.docType)
    setFiles(values.files)
    setTermsAccepted(values.termsAccepted)
  }, [values, setFields, setDocType, setFiles, setTermsAccepted])

  return (
    <>
      <PortalHeader />
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
            onChange={(event) => {
              const docType = event.target.value
              setFieldValue('docType', docType)
              if (docType !== values.docType) {
                setFieldValue('files.front', null, false)
                setFieldValue('files.back', null, false)
                setFieldTouched('files.front', false, false)
                setFieldTouched('files.back', false, false)
              }
            }}
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
              label={
                values.docType === 'International Passport'
                  ? 'Upload your Identity Document (Front)'
                  : 'Upload your Identity Document'
              }
              file={values.files.front}
              onFile={(front) => {
                setFieldTouched('files.front', true)
                setFieldValue('files.front', front)
              }}
              validationError={touched.files?.front && errors.files?.front}
              required
            />
            {values.docType === 'International Passport' && (
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
            )}
          </div>
          <div className="utility-upload" id="utility-upload">
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
          {outstandingRequired && (
            <section
              className="outstanding-information"
              id="outstanding-information"
            >
              <h2>Outstanding Information</h2>
              <FormField
                as="select"
                name="occupation"
                label="Occupation *"
                className="large-input form-select"
              >
                <option value="">Select your occupation</option>
                <option>Employed</option>
                <option>Self-employed</option>
                <option>Student</option>
                <option>Retired</option>
                <option>Other</option>
              </FormField>
              <FormField
                as="select"
                name="natureOfBusiness"
                label="Nature of Business *"
                className="large-input form-select"
              >
                <option value="">Select your nature of business</option>
                <option>Trading</option>
                <option>Services</option>
                <option>Manufacturing</option>
                <option>Other</option>
              </FormField>
              <FormField
                name="employerName"
                label="Employer Name"
                placeholder="Enter your employers name"
              />
              <FormField
                name="employerAddress"
                label="Employer Address"
                placeholder="Enter your employers address"
              />
              <FormField
                as="select"
                name="annualTurnover"
                label="Annual Turn-Over"
                className="large-input form-select"
              >
                <option value="">Select your annual turn-over</option>
                <option>Below ₦1 million</option>
                <option>₦1 million – ₦5 million</option>
                <option>Above ₦5 million</option>
              </FormField>
            </section>
          )}
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
          </div>
          <Button variant="update" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Update'}
          </Button>
        </Form>
      </main>
    </>
  )
}

function UpdateForm(props) {
  const initialValues = {
    occupation: '',
    natureOfBusiness: '',
    employerName: '',
    employerAddress: '',
    annualTurnover: '',
    account: props.account,
    nin: props.fields.nin,
    idNumber: props.fields.idNumber,
    docType: props.docType,
    files: props.files,
    termsAccepted: props.termsAccepted,
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur
      validate={(values) => {
        const errors = validateUpdateForm(values)
        if (props.outstandingRequired) {
          if (!values.occupation) errors.occupation = 'Select your occupation.'
          if (!values.natureOfBusiness)
            errors.natureOfBusiness = 'Select your nature of business.'
        }
        return errors
      }}
      onSubmit={props.onSubmit}
    >
      <UpdateFormFields {...props} />
    </Formik>
  )
}

export default UpdateForm
