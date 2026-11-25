import { z } from 'zod'

const acceptedFile = z.custom((file) => file instanceof File, 'Upload a file.')

export const accountSchema = z
  .string()
  .regex(/^\d{10}$/, 'Enter a valid 10-digit account number.')

export function validateAccount(values) {
  const result = accountSchema.safeParse(values.account)
  return result.success ? {} : { account: result.error.issues[0].message }
}

const verificationSchema = z.object({
  account: accountSchema,
  otp: z
    .string()
    .length(6, 'Enter the 6-digit verification code.')
    .regex(/^\d{6}$/, 'Enter the 6-digit verification code.')
    .refine((code) => code === '123456', 'The OTP code is wrong or invalid.'),
})

export function validateVerification(values) {
  const result = verificationSchema.safeParse(values)
  if (result.success) return {}

  return result.error.issues.reduce((errors, issue) => {
    const path = issue.path[0]
    if (path && !errors[path]) errors[path] = issue.message
    return errors
  }, {})
}

export const updateFormSchema = z.object({
  account: z
    .string()
    .regex(/^\d{10}$/, 'Enter a valid 10-digit account number.'),
  nin: z.string().regex(/^\d{10,11}$/, 'Enter a valid NIN (10 or 11 digits).'),
  docType: z.string().min(1, 'Choose an identity document type.'),
  idNumber: z.string().trim().min(1, 'Enter your identity document number.'),
  files: z.object({
    front: acceptedFile,
    back: acceptedFile,
    utility: acceptedFile,
  }),
  termsAccepted: z.literal(true, {
    error: 'Accept the terms and data processing consent to continue.',
  }),
  consentAccepted: z.literal(true, {
    error: 'Accept the terms and data processing consent to continue.',
  }),
})

export function validateUpdateForm(values) {
  const result = updateFormSchema.safeParse(values)
  if (result.success) return {}

  return result.error.issues.reduce((errors, issue) => {
    const path = issue.path.join('.')
    if (path.startsWith('files.')) {
      errors.files ??= {}
      errors.files[issue.path[1]] = issue.message
    } else if (!errors[path]) {
      errors[path] = issue.message
    }
    return errors
  }, {})
}
