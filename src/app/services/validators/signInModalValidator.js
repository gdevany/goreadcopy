import Validations from '../validations'

const { validateAll, presenceOf } = Validations

const SignInModalValidator = () => {
  const validate = validateAll([
    presenceOf({ field: 'username' }),
    presenceOf({ field: 'password' })
  ])

  return {
    validate
  }
}

export default SignInModalValidator()
