import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideRoutes, Routes } from '@angular/router';
import { Observable } from 'rxjs';
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
}

export interface CrudConfigInterface {
  name: string;
  fields: CrudField[];
}

//
// @NgModule()
// export class CrudModule {
//   static forFeature(config: any): ModuleWithProviders<CrudModule> {
//     return {
//       ngModule: CrudModule,
//       imports: [CommonModule, RouterModule.forChild([])],
//     };
//   }
// }

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
}
export abstract class CrudAdapter2 {}

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [ListComponent, FormComponent],
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
        ]),
        {
          provide: CrudConfig,
          useValue: config,
        },
      ],
    };
  }
}
