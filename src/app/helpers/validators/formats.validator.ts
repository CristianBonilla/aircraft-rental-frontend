import { AbstractControl } from "@angular/forms";

export function numberValidator({ value }: AbstractControl) {
  if (value && isNaN(+value)) {
    return { isNaN: true };
  }
  return null;
}

export function onlyNumbers({ value }: AbstractControl) {
  return !/^\d*$/.test(value) ? { onlyNumbers: true } : null;
}
