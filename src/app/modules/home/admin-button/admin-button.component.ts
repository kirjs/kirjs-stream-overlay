import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../admin/stream-manager/account-list/account.service';

@Component({
  selector: 'app-admin-button',
  templateUrl: './admin-button.component.html',
  styleUrls: ['./admin-button.component.scss'],
})
export class AdminButtonComponent implements OnInit {
  readonly isAdmin$ = this.accountService.isAdmin$;
  constructor(private readonly accountService: AccountService) {}

  ngOnInit(): void {}
}
