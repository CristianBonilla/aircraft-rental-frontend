import { ValidationErrors } from '@angular/forms';

export const DEFAULT_ERROR_MESSAGE = 'El valor de este campo no es válido';

export const ERROR_MESSAGES = {
  required: 'Este campo es requerido',
  minlength: 'Este campo debe tener mínimo { minlength.requiredLength } caracteres',
  maxlength: 'Este campo debe tener máximo { maxlength.requiredLength } caracteres',
  pattern: 'El valor de este campo no es válido',
  min: 'El valor de este campo debe ser mayor o igual a { min.min }',
  max: 'El valor de este campo debe ser menor o igual a { max.max }',
  telBetweenDigits: 'El número de telefono debe tener entre { telBetweenDigits.min } y { telBetweenDigits.max } dígitos',
  maxExpenses: 'El valor de este campo debe ser menor o igual a { max.max }',
  phoneDigits: 'Tu número de teléfono debe tener { phoneDigits.digits } dígitos',
  isNaN: 'El valor de este campo debe ser numérico',
  fullName: 'Debes ingresar un nombre válido',
  minCurrency: 'El valor de este campo debe ser mayor a $ { minCurrency.min }',
  maxCurrency: 'El valor de este campo debe ser menor a $ { maxCurrency.max }',
  maxAdvance: 'El valor no puede exceder tu disponible para avances ($ { maxAdvance.max })',
  isMultiple: 'El valor no es múltiplo de $ { isMultiple.multiple }',
  validEmail: 'Debes ingresar una email válido',
  betweenAge: 'Debes tener entre { betweenAge.min } y { betweenAge.max } años',
  validAddress: 'Debes ingresar una dirección válida',
  noPasswordMatch: 'Las contraseñas no coinciden',
  onlyNumbers: 'Solo se permiten valores numéricos en este campo'
};

function interpolate(messageTemplate: string, objError: object) {
  try {
    const transform = messageTemplate.replace(/{([^{}]*)}/g, (_: string, keys: string) => {
      const interpolated = keys.split('.').reduce((acc, key) => acc[key.trim()], objError);
      if (typeof interpolated !== 'string' && typeof interpolated !== 'number') {
        throw new Error('Expected a number or string value');
      }

      return interpolated.toString();
    });

    return transform;
  } catch (error) {
    console.error(`Failed to interpolate the message, please check the input object.`, error);

    return DEFAULT_ERROR_MESSAGE;
  }
}

export function resolveErrorMessage(errors: ValidationErrors) {
  const firstErrorKey = errors ? Object.keys(errors)[0] : null;
  const message = ERROR_MESSAGES[firstErrorKey];
  const firstError = firstErrorKey ? { [firstErrorKey]: errors[firstErrorKey] } : null;
  const errorMessage = firstError && message ? interpolate(message, firstError) : DEFAULT_ERROR_MESSAGE;

  return errorMessage;
}
