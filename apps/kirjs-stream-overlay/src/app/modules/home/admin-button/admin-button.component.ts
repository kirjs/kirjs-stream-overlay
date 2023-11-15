import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../admin/stream-manager/account-list/account.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-admin-button',
    templateUrl: './admin-button.component.html',
    styleUrl: './admin-button.component.scss',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        MatIconModule,
        AsyncPipe,
    ],
})
export class AdminButtonComponent implements OnInit {
  readonly isAdmin$ = this.accountService.isAdmin$;
  constructor(private readonly accountService: AccountService) {}

  ngOnInit(): void {}
}
