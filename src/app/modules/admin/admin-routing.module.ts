import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TokensComponent} from './api-keys/tokens.component';
import {AdminWrapperComponent} from './admin-wrapper/admin-wrapper.component';
import {StreamConfigComponent} from './stream-manager/stream-config/stream-config.component';
import {StreamListComponent} from './stream-manager/stream-list/stream-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      {path: 'tokens', component: TokensComponent},
      {path: 'streams/:id', component: StreamConfigComponent},
      {
        path: 'streams',
        component: StreamListComponent,
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
export class AdminRoutingModule {
}
