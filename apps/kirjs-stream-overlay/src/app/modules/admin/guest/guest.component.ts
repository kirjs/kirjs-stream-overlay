import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Guest } from './guest_types';
import { LapteuhService } from './lapteuh.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
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
