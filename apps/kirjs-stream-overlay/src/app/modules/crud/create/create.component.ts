import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudAdapter } from '../crud.module';
import { FormComponent } from '../form/form.component';

@Component({
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    standalone: true,
    imports: [FormComponent],
})
export class CreateComponent {
  constructor(
    public readonly crudAdapter: CrudAdapter<any>,
    private readonly router: Router,
  ) {}

  createData(data: any): any {
    this.crudAdapter.create(data).subscribe(a => {
      this.router.navigate(['/', 'admin', 'guests']);
    });
  }
}
