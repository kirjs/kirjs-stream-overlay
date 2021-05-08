import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamManagerComponent } from './stream-manager/stream-manager.component';
import { TokensComponent } from './api-keys/tokens.component';
import { AdminWrapperComponent } from './admin-wrapper/admin-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      { path: 'tokens', component: TokensComponent },
      { path: '', component: StreamManagerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
