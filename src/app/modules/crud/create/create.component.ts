import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAdapter } from '../firebaseAdapter';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(
    public readonly crudAdapter: FirebaseAdapter<any>,
    private readonly router: Router,
  ) {}

  createData(data: any): any {
    this.crudAdapter.create(data).subscribe();
    this.router.navigate(['/', 'admin', 'guests']);
  }
}
