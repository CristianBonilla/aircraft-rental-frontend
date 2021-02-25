import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleDirective } from '@directives/toggle/toggle.directive';
import { FormErrorHandlerDirective } from '@directives/form-error-handler/form-error-handler.directive';

@NgModule({
  declarations: [ ToggleDirective, FormErrorHandlerDirective ],
  imports: [ CommonModule ],
  exports: [ ToggleDirective, FormErrorHandlerDirective ]
})
export class DirectivesModule { }
