import { z } from 'zod'

const fileSchema = (message) =>
  z.custom(
    (file) => typeof File !== 'undefined' && file instanceof File,
    message,
  )

export const accountSchema = z
  .string()
  .regex(/^\d{10}$/, 'Enter a 10-digit account number.')

export function validateAccount(values) {
  const result = accountSchema.safeParse(values.account)
  return result.success ? {} : { account: result.error.issues[0].message }
}

export const updateFormSchema = z
  .object({
    account: z.string().regex(/^\d{10}$/, 'Enter a 10-digit account number.'),
    nin: z.string().regex(/^\d{11}$/, 'Enter an 11-digit NIN.'),
    docType: z.string().min(1, 'Select an identity document type.'),
    idNumber: z.string().trim().min(1, 'Enter your identity document number.'),
    files: z.object({
      front: fileSchema('Upload your identity document.'),
      back: z.custom(
        (file) =>
          file === null ||
          (typeof File !== 'undefined' && file instanceof File),
        'Upload a valid file.',
      ),
      utility: fileSchema('Upload a utility bill.'),
    }),
    termsAccepted: z.literal(true, {
      error: 'Accept the terms and conditions.',
    }),
  })
  .superRefine((values, ctx) => {
    if (values.docType === 'International Passport' && !values.files.back) {
      ctx.addIssue({
        code: 'custom',
        path: ['files', 'back'],
        message: 'Upload the back of your international passport.',
      })
    }
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
