import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestreamGuard } from '../integrations/restream/restream.guard';
import { TwitchLoginComponent } from '../integrations/twitch/twitch-login/twitch-login.component';
import { TwitchRedirectGuard } from '../integrations/twitch/twitch-redirect.guard';
import { AdminWrapperComponent } from './admin-wrapper/admin-wrapper.component';
import { TokensComponent } from './api-keys/tokens.component';
import { UserIsAdminGuard } from './guards/user-is-admin.guard';
import { AccountListComponent } from './stream-manager/account-list/account-list.component';
import { StreamConfigComponent } from './stream-manager/stream-config/stream-config.component';
import { StreamListComponent } from './stream-manager/stream-list/stream-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UserIsAdminGuard],

    component: AdminWrapperComponent,
    children: [
      { path: 'tokens', component: TokensComponent },
      {
        path: 'streams/:id',
        component: StreamConfigComponent,
      },
      {
        path: 'login',
        children: [
          {
            // This is needed for restream API auth
            path: 'restream',
            canActivate: [RestreamGuard],
            children: [],
          },
          {
            // This is needed for restream API auth
            path: 'twitch',
            children: [
              {
                path: '',
                component: TwitchLoginComponent,
              },
              {
                path: 'redirect',
                canActivate: [TwitchRedirectGuard],
                children: [],
              },
            ],
          },
        ],
      },
      {
        path: 'streams',
        component: StreamListComponent,
      },
      {
        path: 'guests',
        loadChildren: () =>
          import('./guest/wateverglModule').then(mod => mod.GuestModule),
      },
      {
        path: 'accounts',
        component: AccountListComponent,
      },
      {
        pathMatch: 'full',
        path: '',
        redirectTo: 'streams',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
