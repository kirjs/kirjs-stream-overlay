import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudModule } from '../../crud/crud.module';

@NgModule({
  imports: [
    CommonModule,
    CrudModule.forConfig({
      name: 'guest',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'input',
          validators: [],
        },
        {
          name: 'highlights',
          label: 'Highlights',
          type: 'input',
        },
      ],
    }),
  ],
})
export class WateverglModule {}
