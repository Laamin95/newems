const rules = {
    required: (value) => {
        const msg = {
            en: 'This field is required.',
            dv: 'ފުރަންޖެހޭ'
        }
        return !!value || msg
    },
    email: (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return pattern.test(value) || 'Invalid email address.'
    },
    min: (min) => {
        return (value) => {
            return (value && value.length >= min) || `Minimum length is ${min} characters.`
        }
    },
    max: (max) => {
        return (value) => {
            return (value && value.length <= max) || `Maximum length is ${max} characters.`
        }
    },
    numeric: (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value) || 'This field must be a number.'
    },
    nid:(country) =>{
        return (value) => {
            if(country === 'mv'){
                const pattern = /^A\d{6}$/
                return pattern.test(value) || 'NID must start with A followed by 6 digits for Maldives'
            }
            // Add more country-specific NID patterns as needed
            return true; 
        }
    },
    // Custom pattern validator that takes a condition function and a regex pattern
    customPattern: (conditionFn, pattern, errorMsg = 'Invalid format.') => {
        return (value) => {
            // If condition is met, validate with pattern
            if (conditionFn()) {
                const regex = new RegExp(pattern)
                return regex.test(value) || errorMsg
            }
            // If condition not met, skip validation
            return true
        }
    }
}

export default rules;