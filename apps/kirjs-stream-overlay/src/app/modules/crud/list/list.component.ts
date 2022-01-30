import { Component, OnInit } from '@angular/core';
import { CrudConfig } from '../crud.module';
import { FirebaseAdapter } from '../firebaseAdapter';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  readonly fields = this.config.fields;
  readonly items$ = this.crudAdapter.list();

  constructor(
    readonly config: CrudConfig,
    public readonly crudAdapter: FirebaseAdapter<any>,
  ) {}

  ngOnInit(): void {}
}
