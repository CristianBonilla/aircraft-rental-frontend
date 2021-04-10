import {
  AfterViewInit,
  Attribute,
  Component,
  DoCheck,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WINDOW } from '@core/providers/window.provider';
import {
  DropdownSelectItem,
  DropdownSelectItemValue,
  DropdownSelectOptions,
  DropdownSelectStyle
} from '@shared/components/dropdown-select';

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
export class DropdownSelectComponent implements ControlValueAccessor, AfterViewInit, DoCheck {
  @ViewChild('select')
  readonly selectRef: ElementRef<HTMLSelectElement>;
  private userAgent: string;
  private _style = DropdownSelectStyle.Light;
  private _items: DropdownSelectItem[] = [];
  private _selected: DropdownSelectItemValue | DropdownSelectItemValue[];
  private oldItems: DropdownSelectItem[] = [];
  @Input()
  get items() {
    return this._items;
  }
  set items(items: DropdownSelectItem[]) {
    this._items = items;
  }
  @Input() options: DropdownSelectOptions = { };
  @Input()
  get style() {
    return this._style;
  }
  set style(style: DropdownSelectStyle) {
    this.changeStyle(style);
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
  onChange = (_value?: any) => { };
  onTouched = (_value?: any) => { };

  get selected() {
    return this._selected;
  }

  set selected(values: DropdownSelectItemValue | DropdownSelectItemValue[]) {
    let changeValues = false;
    if (Array.isArray(values)) {
      changeValues = this.hasDiff(this._selected as DropdownSelectItemValue[], values);
    } else {
      changeValues = !!values && this._selected !== values;
    }
    if (changeValues) {
      this.onChange(values);
      this.onTouched(values);
      this._selected = values;
    }
  }

  constructor(
    @Attribute('placeholder') public placeholder: string,
    @Attribute('id') public id: string,
    @Attribute('name') public name: string,
    @Inject(WINDOW) window: Window
  ) {
    this.userAgent = window.navigator.userAgent;
    this._selected = !!this.multiple ? [] : null;
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
      if (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(this.userAgent) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(this.userAgent)
      ) {
        this.$select.selectpicker('mobile');
      }
    });
  }

  // check when there are items to refresh
  ngDoCheck() {
    if (this.hasDiff(this.items, this.oldItems)) {
      this.refresh();
      this.oldItems = [ ...this.items ];
    }
  }

  get hasSelected() {
    return !!this.selected ? Array.isArray(this.selected) ? !!this.selected.length : true : false;
  }

  writeValue(obj: any) {
    this._selected = obj;
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

  compareSelectedFn(
    valueA: DropdownSelectItemValue | DropdownSelectItemValue[],
    valueB: DropdownSelectItemValue | DropdownSelectItemValue[]
  ) {
    return !!valueA && !!valueB && valueA === valueB;
  }

  private changeStyle(style: DropdownSelectStyle) {
    if (!this.$select) {
      return;
    }
    this.$select.selectpicker('setStyle', this.style, 'remove');
    this.$select.selectpicker('setStyle', style, 'add');
  }

  private refresh() {
    if (!!this.$select && !!this.items.length) {
      setTimeout(() => this.$select.selectpicker('refresh'));
    }
  }

  private hasDiff<T>(sourceA: T[], sourceB: T[]) {
    const diff = sourceA.filter(value => !sourceB.includes(value))
      .concat(sourceB.filter(value => !sourceA.includes(value)));

    return !!diff.length;
  }
}
