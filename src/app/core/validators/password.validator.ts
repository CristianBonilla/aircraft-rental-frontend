import { FormGroup } from "@angular/forms";

export function passwordMatchValidator(groupForm: FormGroup) {
  const passwordControl = groupForm.get('password');
  const confirmPasswordControl = groupForm.get('confirmPassword');
  const password = passwordControl?.value ?? '';
  const confirmPassword = confirmPasswordControl?.value ?? '';

  if (password !== confirmPassword) {
    confirmPasswordControl.setErrors({ noPasswordMatch: true });
  } else {
    if (!!confirmPassword) {
      confirmPasswordControl.setErrors(null);
    } else {
      confirmPasswordControl.setErrors({ required: true });
    }
  }
}
