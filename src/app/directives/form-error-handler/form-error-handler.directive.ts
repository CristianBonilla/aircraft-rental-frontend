import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { resolveErrorMessage } from '@core/errors/errors';
import { delay } from 'rxjs/operators';

interface ControlElements {
  $element: HTMLElement;
  $parent: HTMLElement;
  $error: HTMLDivElement;
};

@Directive({
  selector: '[arfFormErrorHandler]'
})
export class FormErrorHandlerDirective implements OnInit {
  @Input('arfFormErrorHandler') control: AbstractControl;

  constructor(private controlElementRef: ElementRef<HTMLElement>, private renderer: Renderer2) { }

  ngOnInit() {
    const controlElements = this.getControlElements();
    this.control.valueChanges.pipe(delay(1)).subscribe(() => {
      if (this.hasError()) {
        this.createErrorElement(controlElements);
      } else {
        this.removeErrorElement(controlElements);
      }
    });
  }

  private getControlElements(): ControlElements {
    const $element = this.controlElementRef.nativeElement;
    const $parent: HTMLElement = this.renderer.parentNode($element);
    const $error: HTMLDivElement = this.renderer.createElement('div');

    return { $element, $parent, $error };
  }

  private createErrorElement({ $element, $parent, $error }: ControlElements) {
    if (!$parent.contains($error)) {
      this.renderer.appendChild($parent, $error);
    }
    const errorMessage = this.getErrorMessage();
    if ($error.innerText !== errorMessage) {
      $error.innerText = errorMessage;
    }
    if (!this.hasClasses($error, 'invalid-feedback')) {
      this.renderer.addClass($error, 'invalid-feedback');
    }
    if (!this.hasClasses($element, 'is-invalid')) {
      this.renderer.addClass($element, 'is-invalid');
    }
  }

  private removeErrorElement({ $element, $parent, $error }: ControlElements) {
    if ($parent.contains($error)) {
      this.renderer.removeChild($parent, $error);
    }
    if (this.hasClasses($element)) {
      this.renderer.removeClass($element, 'is-invalid');
    }
  }

  private hasClasses($element: HTMLElement, ...classes: string[]) {
    return classes.every(className => $element.classList.contains(className));
  }

  private getErrorMessage() {
    return this.hasError() ? resolveErrorMessage(this.control.errors) : null;
  }

  private hasError() {
    return this.control.invalid && this.control.dirty || this.control.invalid && this.control.touched;
  }
}
