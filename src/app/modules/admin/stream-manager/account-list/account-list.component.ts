import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accountName = '';

  constructor(public readonly accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  addAccount(): void {
    this.accountService.addAccount(this.accountName);
  }
}
