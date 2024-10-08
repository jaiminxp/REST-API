import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password length should be minimum 6 characters'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({ required_error: 'Email is required' }).email(
      'Not a valid email'
    ),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>
