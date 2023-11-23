// type DateConfig = {
//     max?: string,
//     min?: string
// }

// interface IConfig {
//     minLength?: number,
//     minLengthEqual?,
//     maxLength?: number,
//     maxLengthEqual?,
//     minNumber?,
//     minNumberEqual?,
//     maxNumber?,
//     maxNumberEqual?,
//     isInteger?,
//     isNumber?,
//     dateConfig?
//     validateFunction?:(value)=>boolean,
// }
const validNumber = (x) => {
    const parsedValue = Number(x)
    if (parsedValue !== null && Number.isFinite(parsedValue)) {
        return true
    }
    return false

}
class Validate {
    value
    constructor(value) {
        this.value = value

    }
    validDate(config = {}) {
        if (this.value === undefined || !validNumber(Date.parse(this.value))) {
            return false
        }
        if (config.min && new Date(this.value).getTime() < new Date(config.min).getTime()) {
            return false
        }
        if (config.max && new Date(this.value).getTime() > new Date(config.max).getTime()) {
            return false
        }
        return true
    }
    validPhone() {
        if (typeof this.value !== 'string') {
            return false
        }
        return /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10}$/.test(this.value)
    }
    validPassword() {
        if (typeof this.value !== 'string') {
            return false
        }
        return /^[A-Za-z\d@$!%*#?&._-]{8,32}$/s.test(this.value)
    }
    validLogin() {
        if (typeof this.value !== 'string') {
            return false
        }
        return /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{3,19}$/s.test(this.value)
    }
    validName() {
        if (typeof this.value !== 'string') {
            return false
        }
        return /^[A-ZА-ЯЁ][а-яёa-z]{1,20}$/s.test(this.value)
    }
    validLastName() {
        if (typeof this.value !== 'string') {
            return false
        }
        return /^[A-ZА-ЯЁ][а-яёa-z]{1,24}$/s.test(this.value)
    }
    validMiddleName() {
        if (typeof this.value !== 'string') {
            return false
        }
        return /^[A-ZА-ЯЁ][а-яёa-z]{1,24}$/s.test(this.value)
    }
    validPassport() {
        if (typeof this.value === 'string') {
            return /^\d{10}$/s.test(this.value)
        } else if (typeof this.value === 'number') {
            return /^\d{10}$/s.test(String(this.value))
        } else {
            return false
        }

    }
    minLength(minL) {
        if (typeof this.value !== 'string' || this.value.length <= minL) {
            return false
        }
        return true
    }
    minLengthEqual(minLE) {
        if (typeof this.value !== 'string' || this.value.length < minLE) {
            return false
        }
        return true
    }
    maxLength(maxL) {
        if (typeof this.value !== 'string' || this.value.length >= maxL) {
            return false
        }
        return true
    }
    maxLengthEqual(maxLE) {
        if (typeof this.value !== 'string' || this.value.length > maxLE) {
            return false
        }
        return true
    }
    minNumber(minN) {
        if (!validNumber(this.value) || Number(this.value) <= minN) {
            return false
        }
        return true
    }
    minNumberEqual(minNE) {
        if (!validNumber(this.value) || Number(this.value) < minNE) {
            return false
        }
        return true
    }
    maxNumber(maxN) {
        if (!validNumber(this.value) || Number(this.value) >= maxN) {
            return false
        }
        return true
    }
    maxNumberEqual(maxNE) {
        if (!validNumber(this.value) || Number(this.value) > maxNE) {
            return false
        }
        return true
    }
    isInteger() {
        if (!validNumber(this.value) || !Number.isInteger(+this.value))
            return false
        return true
    }
    isNumber() {
        if (!validNumber(this.value)) {
            return false
        }
        return true
    }
    validateFunction(foo) {
        if (!foo(this.value)) {
            return false
        }
        return true
    }

    validateConfig(config) {
        for (let key in config) {

            if (key === 'minLength') {
                if (!this.minLength(Number(config[key])))
                    return false
            }
            if (key === 'minLengthEqual') {
                if (!this.minLengthEqual(Number(config[key])))
                    return false
            }
            if (key === 'maxLength') {
                if (!this.maxLength(Number(config[key])))
                    return false
            }
            if (key === 'maxLengthEqual') {
                if (!this.maxLengthEqual(Number(config[key])))
                    return false
            }
            if (key === 'minNumber') {
                if (!this.minNumber(Number(config[key])))
                    return false
            }
            if (key === 'minNumberEqual') {
                if (!this.minNumberEqual(Number(config[key])))
                    return false
            }
            if (key === 'maxNumber') {
                if (!this.maxNumber(Number(config[key])))
                    return false
            }
            if (key === 'maxNumberEqual') {
                if (!this.maxNumberEqual(Number(config[key])))
                    return false
            }
            if (key === 'isInteger') {
                if (config[key] !== this.isInteger()) {
                    return false
                }
            }
            if (key === 'isNumber') {
                if (config[key] !== this.isNumber()) {
                    return false
                }
            }
            if (key === 'dateConfig') {
                if (!this.validDate(config[key])) {
                    return false
                }
            }
        }
        return true
    }

}
module.exports = Validate