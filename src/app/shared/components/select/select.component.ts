import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { SelectBackgroundColor } from './select-background-color.enum';
import { Option } from './option.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const getStyles = (...args: string[]) => ['select', ...args].filter(Boolean);
const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [SELECT_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = 'Selecciona';
  @Input() error: string = '';
  @Input() valuePlaceholder: string = 'Seleccionar';
  @Input() items: Option[] = [];
  @Input() opened = false;
  @Input() selectedVariant: SelectBackgroundColor = SelectBackgroundColor.base;
  @Output() clickedOff = new EventEmitter();
  @Output() valueonChange = new EventEmitter();
  @Output() closeSelect = new EventEmitter();
 
  name = '';
  value = '';
  @Input() icon: string = 'arrow_drop_down';
  @Input() iconColor: string = '#000000';
  @Input() iconSize: string = '0.7em';
 
  public get classes(): string[] {
    return getStyles();
  }
 
  public get selectedClass(): string[] {
    const backgroundSelected = SelectBackgroundColor[this.selectedVariant];
    if (this.error) return ['selected', 'error'];
    else return ['selected', backgroundSelected];
  }
 
  onClicked(ev: Event): void {
    ev.stopPropagation();
    this.opened = !this.opened;
    if (this.opened) {
      this.enableEventClicked();
    } else {
      this.disableEventClicked();
    }
  }
 
  enableEventClicked(): void {
    document.addEventListener('click', () => {
      this.clickHandling();
    });
  }
 
  disableEventClicked(): void {
    document.removeEventListener('click', () => {
      this.clickHandling();
    });
  }
 
  clickHandling(): void {
    if (this.opened) {
      this.opened = false;
      const option = {
        name: this.name,
        value: this.value,
      };
      this.clickedOff.emit(option);
      this.disableEventClicked();
    }
  }
 
  // blur() {
  //   alert('foo bar');
  // }
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionClicked(option: any): void {
    this.value = option.value;
    this.name = option.name;
    this.valuePlaceholder = option.name;
    this.selectedVariant = SelectBackgroundColor.base;
    this.valueonChange.emit(option);
  }

  // Implementa los métodos de la interfaz ControlValueAccessor
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    // Implementa el cambio de valor cuando se selecciona algo en tu componente
  }

  registerOnTouched(fn: any): void {
    // Implementa el manejo del evento "touched"
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementa el cambio de estado "disabled" si es necesario
  }
}
