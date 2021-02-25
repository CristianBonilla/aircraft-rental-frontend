import { FormGroup, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(formGroup: FormGroup): ValidationErrors {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');
  const password = passwordControl?.value ?? null;
  const confirmPassword = confirmPasswordControl?.value ?? null;

  if (!!confirmPassword && password !== confirmPassword) {
    confirmPasswordControl.setErrors({ noPasswordMatch: true });

    return { noPasswordMatch: true };
  } else if (!!confirmPassword && password === confirmPassword) {
    confirmPasswordControl.setErrors(null);

    return null;
  }
  confirmPasswordControl.setErrors({ required: true });

  return { required: true };
}
