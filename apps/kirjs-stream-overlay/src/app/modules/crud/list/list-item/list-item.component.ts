import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CrudConfig } from '../../crud.module';
import { NgFor } from '@angular/common';

@Component({
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.css',
    standalone: true,
    imports: [NgFor],
})
export class ListItemComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly data: any,
    readonly config: CrudConfig,
  ) {}
}
