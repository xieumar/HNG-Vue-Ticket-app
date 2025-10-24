import { ref, computed } from 'vue'

export function useFormValidation(fields) {
  const errors = ref({})

  const validate = () => {
    errors.value = {}
    for (const key in fields) {
      validateField(key)
    }
    return Object.keys(errors.value).length === 0
  }

  const validateField = (key) => {
    const field = fields[key]
    if (field.required && !field.value.value) {
      errors.value[key] = 'This field is required'
    } else if (field.isEmail && !/^\S+@\S+\.\S+$/.test(field.value.value)) {
      errors.value[key] = 'Please enter a valid email address'
    } else {
      delete errors.value[key]
    }
  }

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  return { errors, validate, validateField, hasErrors }
}
