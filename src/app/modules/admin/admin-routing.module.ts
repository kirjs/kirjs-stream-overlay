import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestreamGuard } from '../integrations/restream/restream.guard';
import { AdminWrapperComponent } from './admin-wrapper/admin-wrapper.component';
import { TokensComponent } from './api-keys/tokens.component';
import { AccountListComponent } from './stream-manager/account-list/account-list.component';
import { StreamConfigComponent } from './stream-manager/stream-config/stream-config.component';
import { StreamListComponent } from './stream-manager/stream-list/stream-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      { path: 'tokens', component: TokensComponent },
      { path: 'streams/:id', component: StreamConfigComponent },
      {
        path: 'login',
        children: [
          {
            // This is needed for restream API auth
            path: 'restream',
            canActivate: [RestreamGuard],
            children: [],
          },
        ],
      },
      {
        path: 'streams',
        component: StreamListComponent,
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
