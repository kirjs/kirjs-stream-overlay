import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Guest } from './guest_types';
import { LapteuhService } from './lapteuh.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrl: './guest.component.scss',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        AsyncPipe,
    ],
})
export class GuestComponent implements OnInit {
  readonly nameControl = new FormControl();
  editedGuestKey?: string;
  readonly form = new FormGroup({
    name: this.nameControl,
    highlights: new FormControl(),
    email: new FormControl(),
  });

  constructor(readonly guestService: LapteuhService) {}

  ngOnInit(): void {}

  editGuest(guest: Guest): void {
    this.editedGuestKey = guest.key;
    this.form.setValue({
      name: guest.name,
      highlights: guest.highlights,
      email: guest.email,
    });
  }

  submit() {
    if (this.editedGuestKey) {
      this.guestService.updateGuest(
        this.editedGuestKey,
        this.form.getRawValue(),
      );
      this.editedGuestKey = undefined;
    } else {
      throw new Error('no edited guest key');
    }
  }

  addGuest(): void {
    this.guestService.addGuest({
      name: 'new guest',
      email: '',
      highlights: '',
    });
  }
}
