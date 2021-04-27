import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverlayComponent} from './modules/overlay/overlay.component';
import {AnnounceComponent} from './modules/announce/announce.component';
import {StreamCompleteComponent} from './modules/stream-complete/stream-complete.component';
import {WaitingScreenWrapperComponent} from './modules/waiting-screen/waiting-screen-wrapper.component';
import {HomeComponent} from "./modules/home/home.component";

const routes: Routes = [
  {path: 'overlay', component: OverlayComponent},
  {path: '', component: HomeComponent},
  {path: 'waiting', component: WaitingScreenWrapperComponent},
  {path: 'complete', component: StreamCompleteComponent},
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(m => m.AdminModule),
  },
  {path: 'announce', component: AnnounceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
