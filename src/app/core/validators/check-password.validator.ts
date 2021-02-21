import { FormGroup } from "@angular/forms";

export function checkPassword(groupForm: FormGroup) {
  const password = groupForm.get('password')?.value ?? '';
  const confirmPassword = groupForm.get('confirmPassword')?.value ?? '';

  return password === confirmPassword ? null : { notSame: true };
}
