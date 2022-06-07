import { Component, OnInit } from '@angular/core';
import { CrudAdapter, CrudConfig } from '../crud.module';

// http://localhost:4200/admin/integrations/twitch
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
