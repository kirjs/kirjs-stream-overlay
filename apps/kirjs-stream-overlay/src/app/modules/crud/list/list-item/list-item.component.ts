import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CrudConfig } from '../../crud.module';

@Component({
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly data: any,
    readonly config: CrudConfig,
  ) {}
}
