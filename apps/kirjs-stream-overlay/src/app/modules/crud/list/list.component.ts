import { Component, OnInit } from '@angular/core';
import { CrudAdapter, CrudConfig } from '../crud.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { NgFor, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

// http://localhost:4200/admin/integrations/twitch
@Component({
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    standalone: true,
    imports: [
        RouterLink,
        NgFor,
        PolymorpheusModule,
        MatButtonModule,
        MatIconModule,
        AsyncPipe,
    ],
})
export class ListComponent implements OnInit {
  readonly fields = this.config.fields;
  readonly items$ = this.crudAdapter.list();

  constructor(
    readonly config: CrudConfig,
    public readonly crudAdapter: CrudAdapter<any>,
  ) {}

  ngOnInit(): void {}

  delete(item: any) {
    this.crudAdapter.delete(item).subscribe();
  }
}
