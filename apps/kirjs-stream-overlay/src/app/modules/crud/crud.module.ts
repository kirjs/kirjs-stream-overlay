import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import {
  PolymorpheusComponent,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListComponent } from './list/list.component';

export abstract class CrudAdapter<T> {
  abstract list(): Observable<T[]>;

  abstract delete(t: T): Observable<void>;

  abstract create(t: T): Observable<T>;

  abstract update(t: T): Observable<T>;

  abstract get(id: string): Observable<T | undefined>;
}

export enum Mode {
  LIST = 1,
  EDIT,
  CREATE,
  VIEW,
}

export enum DisplayMode {
  DISPLAY = 1,
  READONLY,
  HIDDEN,
}

const defaultDisplay = {
  [Mode.LIST]: DisplayMode.DISPLAY,
  [Mode.EDIT]: DisplayMode.DISPLAY,
  [Mode.CREATE]: DisplayMode.DISPLAY,
  [Mode.VIEW]: DisplayMode.DISPLAY,
};
export type Display = Record<string, DisplayMode>;

export interface CrudFieldBase {
  name: string;
  label: string;
  defaultValue?: any;
  placeholder?: string;
  validators?: ValidatorFn[];
  display?: Display;
}

export interface InputField extends CrudFieldBase {
  type: 'input';
}

export interface TextareaField extends CrudFieldBase {
  type: 'textarea';
}

export interface SelectField extends CrudFieldBase {
  type: 'select';
  values: string[];
}

export type CrudField = InputField | TextareaField | SelectField;

export interface CrudConfigInterface {
  adapter?: CrudAdapter<any>;
  name: string;
  fields: CrudFieldBase[];
}

export function getCrudRoutes(config: CrudConfigInterface): Routes {
  return [
    {
      path: '',
      component: ListComponent,
      data: config,
    },
  ];
}

export abstract class CrudConfig implements CrudConfigInterface {
  adapter?: any;
  fields!: CrudField[];
  name!: string;
  components?: {
    listItem?: Type<any> | PolymorpheusComponent<any, any>;
  };
}

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        PolymorpheusModule,
        ReactiveFormsModule,
        RouterModule,
        MatSelectModule,
        ListComponent,
        FormComponent,
        CreateComponent,
        EditComponent,
        ListItemComponent,
    ],
    providers: [],
})
export class CrudModule {
  static forConfig(config: CrudConfig): ModuleWithProviders<CrudModule> {
    config.components = {
      listItem: new PolymorpheusComponent(ListItemComponent),
      ...config.components,
    };

    config.fields = config.fields.map(f => {
      return {
        ...f,
        display: {
          ...defaultDisplay,
          ...f.display,
        },
      };
    });

    return {
      ngModule: CrudModule,
      providers: [
        { provide: CrudAdapter, useClass: config.adapter || CrudAdapter },
        provideRoutes([
          {
            path: '',
            component: ListComponent,
          },
          {
            path: 'list',
            component: ListComponent,
          },
          {
            path: 'create',
            component: CreateComponent,
          },
          {
            path: 'edit/:id',
            component: EditComponent,
          },
        ]),
        {
          provide: CrudConfig,
          useValue: config,
        },
      ],
    };
  }
}
