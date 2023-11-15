import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgFor,
        RouterLink,
        AsyncPipe,
    ],
})
export class AccountListComponent implements OnInit {
  accountName = '';

  constructor(public readonly accountService: AccountService) {}

  ngOnInit(): void {}

  addAccount(): void {
    this.accountService.addAccount(this.accountName);
  }
}
