
import { types } from '../../utils/constants'

export const getTotalMortgageAndCmhc = (price, payment, num_years) => {
  let downpayment_percent = null
  const home_price = Number(price)
  let downpayment = Number(payment)
  if (downpayment >= 1) {
    downpayment_percent = downpayment / home_price
  } else if (downpayment > 0) {
    downpayment_percent = downpayment
    downpayment = home_price * downpayment_percent
  } else {
    return null
  }

  if (Number(downpayment_percent.toFixed(2)) < 0.05 || (home_price >= 1000000 && Number(downpayment_percent.toFixed(2)) < 0.2)) {
    return null
  }

  const loan_to_value = 1 - downpayment_percent
  let principal = home_price - downpayment
  const cmhc = principal * (cmhc_premium(loan_to_value) + cmhc_surcharge(loan_to_value, num_years))
  principal = principal + cmhc

  return {
    principal,
    cmhc
  }
}

const cmhc_premium = (loan_to_value) => {
  if (loan_to_value < 0.0 || loan_to_value > 0.95) { return -1 }

  if (loan_to_value <= 0.80) {
    return 0.0
  } else if (loan_to_value <= 0.85) {
    return 0.0280
  } else if (loan_to_value <= 0.90) {
    return 0.0310
  } else if (loan_to_value <= 0.95) {
    return 0.0400
  }
}

const cmhc_surcharge = (loan_to_value, num_years) => {
  if (loan_to_value < 0.0 || loan_to_value > 1.0 || num_years < 1) { return -1 }

  if (loan_to_value <= 0.80) {
    return 0.0
  } else {
    if (num_years > 30) { return 0.004 } else if (num_years > 25) { return 0.002 } else { return 0.0 }
  }
}

const cmhc_rate = (loan_to_value, num_years) => {
  return cmhc_premium(loan_to_value) + cmhc_surcharge(loan_to_value, num_years)
}

const nominal_to_effective = (nominal_rate, periods_per_year) => {
  const effective_rate = Math.pow(1 + nominal_rate / periods_per_year, periods_per_year) - 1

  return effective_rate
}

const effective_to_nominal = (effective_rate, periods_per_year) => {
  const nominal_rate = periods_per_year * (Math.pow(effective_rate + 1, 1 / periods_per_year) - 1)

  return nominal_rate
}

const annuity_payment = (principal, annual_rate, periods_per_year, num_years) => {
  const total_payments = periods_per_year * num_years
  const periodic_rate = annual_rate / periods_per_year
  const periodic_payment = principal * (periodic_rate + (periodic_rate / (Math.pow(1 + periodic_rate, total_payments) - 1)))

  return periodic_payment
}

export const can_mortgage_payment = (principal, annual_rate, num_years, periods_per_year, divisor) => {
  const effective_rate = nominal_to_effective(annual_rate, 2)
  const nominal_rate = effective_to_nominal(effective_rate, periods_per_year)

  const payment = annuity_payment(principal, nominal_rate, periods_per_year, num_years) / divisor

  return Math.ceil(payment)
}

export const validate = (values) => {
  const errors = {}
  if (!values.name) {
	  errors.name = 'Please provide a valid first name'
  } else if (values.name.length < 3) {
	  errors.name = 'Please provide a valid first name'
  }

  if (!values.lastname) {
	  errors.lastname = 'Please provide a valid last name'
  } else if (values.lastname.length < 3) {
	  errors.lastname = 'Please provide a valid last name'
  }

  if (!values.phone) {
	  errors.phone = 'Please provide a valid 10 digit number'
  } else if (
	  !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
      values.phone
	  )
  ) {
	  errors.phone = 'Please provide a valid 10 digit number'
  }

  if (!values.email) {
	  errors.email = 'Please provide a valid email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	  errors.email = 'Invalid email address'
  }

  if (!values.terms) {
	  errors.terms = 'Please accept terms and conditions to proceed'
  } else if (values.terms[0] !== 'on') {
	  errors.terms = 'Please accept terms and conditions to proceed'
  }

  return errors
}

export const createDataForCRM = (req) => {
  let data = {}
  console.log(req)
  if (req.type === types.CREDITCARD) {
    data = JSON.parse(JSON.stringify(req.selections))
    data.annualIncome = JSON.stringify(data.annualIncome)
    data.expenditure = JSON.stringify(data.expenditure)
  } else if (req.type === types.MORTGAGE) {
    data = JSON.parse(JSON.stringify(req.selections?.formValues))
    data.homeMortgageType = req.selections?.homeMortgageType
    data.subsequentBuyerType = req.selections?.subsequentBuyerType
    data.propertyType = req.selections?.propertyType
    data.refinanceType = req.selections?.refinanceType
  } else {
    data = JSON.parse(JSON.stringify(req.selections?.formValues))
  }
  return data
}
