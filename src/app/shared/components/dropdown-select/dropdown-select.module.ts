import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownSelectComponent } from '@shared/components/dropdown-select/dropdown-select.component';

@NgModule({
  declarations: [ DropdownSelectComponent ],
  imports: [ CommonModule, FormsModule ],
  exports: [ DropdownSelectComponent ]
})
export class DropdownSelectModule { }
