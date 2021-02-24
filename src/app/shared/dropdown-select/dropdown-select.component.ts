import {
  AfterViewInit,
  Attribute,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownSelectItem, DropdownSelectOptions, DropdownSelectStyle } from '@shared/dropdown-select';

@Component({
  selector: 'arf-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownSelectComponent),
      multi: true
    }
  ]
})
export class DropdownSelectComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('select')
  readonly selectRef: ElementRef<HTMLSelectElement>;
  @Input() items: DropdownSelectItem[] = [];
  @Input() options: DropdownSelectOptions = { };
  @Input() style = DropdownSelectStyle.Light;
  @Input() disabled = false;
  @Input() multiple = false;
  defaultOptions: DropdownSelectOptions = {
    selectAllText: 'Seleccionar todo',
    deselectAllText: 'Deseleccionar todo',
    noneSelectedText: 'Nada seleccionado',
    noneResultsText: 'No hay resultados {0}',
    selectedTextFormat: 'count > 3',
    countSelectedText: '{0} Seleccionados',
    selectOnTab: true,
    size: 10,
    width: '100%'
  };
  selectedItems: DropdownSelectItem['value'][] = [];
  onChange = (_value?: any) => { };
  onTouched = (_value?: any) => { };

  get selected() {
    return this.selectedItems;
  }

  set selected(value: DropdownSelectItem['value'][]) {
    if (!!value && this.selectedItems !== value) {
      this.selectedItems = value;
      this.onChange(value);
    }
  }

  constructor(
    @Attribute('placeholder') public placeholder: string,
    @Attribute('id') public id: string,
    @Attribute('name') public name: string
  ) { }

  writeValue(obj: any) {
    this.selectedItems = obj;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  blur(value: any) {
    this.onTouched(value);
  }

  ngAfterViewInit() {
    const select$ = this.selectRef.nativeElement;
    const dropdownSelectOptions: DropdownSelectOptions = {
      ...this.defaultOptions,
      ...this.options,
      style: this.style
    };
    setTimeout(() => $(select$).selectpicker(dropdownSelectOptions), 10);
  }

  compareFn(itemA: DropdownSelectItem, itemB: DropdownSelectItem) {
    return itemA && itemB ? itemA.value === itemB.value : itemA === itemB;
  }
}
