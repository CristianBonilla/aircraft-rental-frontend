export type DropdownSelectOptions = BootstrapSelectOptions;

export interface DropdownSelectItem {
  value: string | number | object;
  text: string;
}

export enum DropdownSelectStyle {
  Light = 'btn-light',
  Primary = 'btn-primary',
  Info = 'btn-info',
  Success = 'btn-success',
  Warning = 'btn-warning',
  Danger = 'btn-danger'
}

export type DropdownSelectItemValues = DropdownSelectItem['value'][];

export interface CustomizeDropdownSelect {
  data: DropdownSelectItem[];
  style: DropdownSelectStyle;
  options: DropdownSelectOptions;
}
