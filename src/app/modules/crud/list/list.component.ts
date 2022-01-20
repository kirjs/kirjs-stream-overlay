import { Component, OnInit } from '@angular/core';
import { CrudConfig } from '../crud.module';
import { FirebaseAdapter } from '../firebaseAdapter';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  readonly fields = this.config.fields;
  readonly items$ = this.crudAdapter.list();

  constructor(
    private readonly config: CrudConfig,
    public readonly crudAdapter: FirebaseAdapter<any>,
  ) {}

  ngOnInit(): void {}
}
