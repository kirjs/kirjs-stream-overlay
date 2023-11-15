import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  PolymorpheusComponent,
  POLYMORPHEUS_CONTEXT,
} from '@tinkoff/ng-polymorpheus';
import { CrudConfig, CrudModule } from '../../crud/crud.module';

@Component({
    template: `<article>
    <h1>{{ data.name }}</h1>
    <code>
      <pre>{{ data.highlights }}</pre>
    </code>
  </article>`,
    standalone: true,
})
export class ListItemComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly data: any,
  ) {}
}

const config: CrudConfig = {
  name: 'guest',
  components: {
    listItem: new PolymorpheusComponent(ListItemComponent),
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'input',
      validators: [Validators.required],
    },
    {
      name: 'highlights',
      label: 'Highlights',
      type: 'textarea',
    },
  ],
};

@NgModule({
    imports: [CommonModule, CrudModule.forConfig(config), ListItemComponent],
})
export class GuestModule {}
