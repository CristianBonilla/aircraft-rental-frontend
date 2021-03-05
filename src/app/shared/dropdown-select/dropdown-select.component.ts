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
import {
  DropdownSelectItem,
  DropdownSelectItemValues,
  DropdownSelectOptions,
  DropdownSelectStyle
} from '@shared/dropdown-select';

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

  private _style = DropdownSelectStyle.Light;

  @Input()
  get style() {
    return this._style;
  }
  set style(style: DropdownSelectStyle) {
    if (!!this.$select) {
      this.$select.selectpicker('setStyle', this._style, 'remove');
      this.$select.selectpicker('setStyle', style, 'add');
    }
    this._style = style;
  }

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
  $select: JQuery<HTMLSelectElement>;
  selectedItems: string | DropdownSelectItemValues;
  onChange = (_value?: any) => { };
  onTouched = (_value?: any) => { };

  get selected() {
    return this.selectedItems;
  }

  set selected(values: string | DropdownSelectItemValues) {
    let changeValues = false;
    if (typeof values === 'string') {
      changeValues = !!values && this.selectedItems !== values;
    } else if (Array.isArray(values)) {
      changeValues = this.hasDiff(this.selectedItems as DropdownSelectItemValues, values);
    }
    if (changeValues) {
      this.selectedItems = values;
      this.onChange(values);
      this.onTouched(values);
    }
  }

  constructor(
    @Attribute('placeholder') public placeholder: string,
    @Attribute('id') public id: string,
    @Attribute('name') public name: string
  ) {
    this.selectedItems = !!this.multiple ? [] : '';
  }

  ngAfterViewInit() {
    const $select = this.selectRef.nativeElement;
    const dropdownSelectOptions: DropdownSelectOptions = {
      ...this.defaultOptions,
      ...this.options,
      style: this.style
    };
    setTimeout(() => {
      this.$select = $($select);
      this.$select.selectpicker(dropdownSelectOptions);
    });
  }

  get hasSelected() {
    return !!this.selected ? Array.isArray(this.selected) ? !!this.selected.length : true : false;
  }

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

  compareSelectedFn(itemA: DropdownSelectItem, itemB: DropdownSelectItem) {
    return itemA && itemB ? itemA.value === itemB.value : itemA === itemB;
  }

  private hasDiff(valuesA: DropdownSelectItemValues, valuesB: DropdownSelectItemValues) {
    const diff = valuesA.filter(value => !valuesB.includes(value))
      .concat(valuesB.filter(value => !valuesA.includes(value)));

    return !!diff.length;
  }
}
