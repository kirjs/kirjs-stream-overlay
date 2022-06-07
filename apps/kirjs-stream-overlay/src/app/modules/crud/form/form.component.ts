import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudConfig, DisplayMode, Mode } from '../crud.module';

function createForm(config: CrudConfig): FormGroup {
  const controls = config.fields.map(control => {
    return [
      control.name,
      new FormControl(control.defaultValue, control.validators || []),
    ];
  });

  return new FormGroup(Object.fromEntries(controls));
}

function formToDb(data: any, key: string): any {
  return { ...data, key };
}

function dbToForm(data: any): any {
  const d = { ...data };
  delete d.key;
  return d;
}

@Component({
  selector: 'crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  readonly DisplayMode = DisplayMode;
  mode = Mode.CREATE;

  @Input() data?: any;
  readonly form = createForm(this.config);

  @Output()
  readonly submitForm: EventEmitter<any> = new EventEmitter();

  constructor(readonly config: CrudConfig) {}

  ngOnInit(): void {
    if (this.data) {
      this.mode = Mode.EDIT;
      this.form.setValue(dbToForm(this.data));
    }
  }

  submit(): void {
    this.submitForm.emit(formToDb(this.form.value, this.data?.key));
  }
}
