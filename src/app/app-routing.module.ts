import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverlayComponent } from './modules/overlay/overlay.component';
import { WaitingScreenEditorComponent } from './modules/admin/waiting-screen-editor/waiting-screen-editor.component';
import { AnnounceComponent } from './modules/announce/announce.component';
import { StreamCompleteComponent } from './modules/stream-complete/stream-complete.component';
import { WaitingScreenWrapperComponent } from './modules/waiting-screen/waiting-screen-wrapper.component';
import { TokensComponent } from './modules/admin/api-keys/tokens.component';

const routes: Routes = [
  { path: 'overlay', component: OverlayComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'waiting', component: WaitingScreenWrapperComponent },
  { path: 'complete', component: StreamCompleteComponent },
  { path: 'admin', component: WaitingScreenEditorComponent },
  { path: 'admin/tokens', component: TokensComponent },
  { path: 'announce', component: AnnounceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
