import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../stream-manager/account-list/account.service';

@Injectable({
  providedIn: 'root',
})
export class UserIsAdminGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  canActivate(): Observable<boolean> {
    return this.accountService.isAdmin$;
  }
}
