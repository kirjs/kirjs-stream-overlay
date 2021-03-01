import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './modules/overlay/chat/chat.component';
import { WaitingScreenComponent } from './modules/waiting-screen/waiting-screen.component';
import { OverlayComponent } from './modules/overlay/overlay.component';
import { WaitingScreenEditorComponent } from './modules/admin/waiting-screen-editor/waiting-screen-editor.component';
import { AnnounceComponent } from './modules/announce/announce.component';
import { StreamCompleteComponent } from './modules/stream-complete/stream-complete.component';

const routes: Routes = [
  { path: 'overlay', component: OverlayComponent },
  { path: 'waiting', component: WaitingScreenComponent },
  { path: 'complete', component: StreamCompleteComponent },
  { path: 'admin', component: WaitingScreenEditorComponent },
  { path: 'announce', component: AnnounceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
