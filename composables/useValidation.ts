const checkValue = (data, key) => {
  const value = data.get(key)
  return value.length > 0
}

const checkEmail = (data, key) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.get(key))
}

export const useValidation = (data, rules) => {
  const errors = {}

  for (const key in rules) {
    for (let r=0; r<rules[key].length; r++) {
      const rule = rules[key][r]
      if (rule === 'required') {
        if (!checkValue(data, key)) {
          errors[key] = 'Please enter a value for this field.'
          break
        }
      } else if (rule === 'email') {
        if (!checkEmail(data, key)) {
          errors[key] = 'Please enter a valid email address.'
          break
        }
      }
    }
  }

  if (!Object.keys(errors).length) {
    return null
  }

  return errors
}
