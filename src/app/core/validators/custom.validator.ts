import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  const pattern = (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);

    return valid ? null : error;
  };

  return pattern;
}
