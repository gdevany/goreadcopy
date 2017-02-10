import Validations from '../validations'

const { validateAll, presenceOf } = Validations

const SignupModalValidator = () => {
  const validate = validateAll([
    presenceOf({ field: 'firstName' }),
    presenceOf({ field: 'lastName' })
  ])

  return {
    validate
  }
}

export default SignupModalValidator()
