import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudAdapter } from '../crud.module';
import { AsyncPipe } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    standalone: true,
    imports: [FormComponent, AsyncPipe],
})
export class EditComponent implements OnInit {
  readonly item$ = this.crudAdapter.get(this.route.snapshot.params.id);

  constructor(
    public readonly crudAdapter: CrudAdapter<any>,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  update($event: any): any {
    this.crudAdapter.update($event);
    this.router.navigate(['/', 'admin', 'guests']);
  }
}
