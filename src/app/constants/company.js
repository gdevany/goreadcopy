// Define global company data here
const address1 = '9020-1 N. Capital of Texas Highway Suite 335 '
const address2 = 'Austin, Texas 78759, United States '
const fullAddress = address1 + address2
const addressMaps = fullAddress.replace(' ', '+')

const defaultPhone = '1 (844) 878-2547'
const defaulthref = '+18448782547'
const defaultTelprotocol = 'tel:(844)%20878-2547'

export const Company = {
  address1,
  address2,
  fullAddress,
  addressMaps,
  defaultPhone,
  defaulthref,
  defaultTelprotocol,
}
