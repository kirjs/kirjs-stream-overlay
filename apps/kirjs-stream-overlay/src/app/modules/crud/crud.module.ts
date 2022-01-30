import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import {
  PolymorpheusComponent,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FirebaseAdapter } from './firebaseAdapter';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

export interface CrudAdapter<T> {
  list: () => Observable<T[]>;
  delete: (t: T) => Observable<void>;
  create: (t: T) => Observable<T>;
  update: (t: T) => Observable<T>;
}

export interface CrudField {
  name: string;
  label: string;
  type: string;
  defaultValue?: any;
  placeholder?: string;
  validators?: ValidatorFn[];
}

export interface CrudConfigInterface {
  name: string;
  fields: CrudField[];
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
  fields!: CrudField[];
  name!: string;
  components?: {
    list?: Type<any> | PolymorpheusComponent<any, any>;
  };
}

export abstract class CrudAdapter2 {}

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    PolymorpheusModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [ListComponent, FormComponent, CreateComponent, EditComponent],
  providers: [FirebaseAdapter],
})
export class CrudModule {
  static forConfig(
    config: CrudConfigInterface,
  ): ModuleWithProviders<CrudModule> {
    return {
      ngModule: CrudModule,
      providers: [
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
