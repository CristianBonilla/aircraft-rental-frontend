import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleDirective } from '@directives/toggle/toggle.directive';

@NgModule({
  declarations: [ ToggleDirective ],
  imports: [ CommonModule ],
  exports: [ ToggleDirective ]
})
export class DirectivesModule { }
