const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

const isEmptyString = value =>
  value === null || value.length === 0 || value === "";

export default class Validators {
  static required(formControl) {
    return isEmptyString(formControl.value) ? { required: true } : null;
  }

  static numeric(formControl) {
    const number = parseInt(formControl.value, 10);
    return isNaN(number) ? { numeric: true } : null;
  }

  static email(formControl) {
    return EMAIL_REGEXP.test(formControl.value) ? null : { email: true };
  }

  static pattern(formControl, pattern) {
    if (pattern instanceof RegExp) {
      throw new TypeError("pattern must be an `RegExp`");
    }

    return pattern.test(formControl.value) ? { pattern: true } : null;
  }
}
