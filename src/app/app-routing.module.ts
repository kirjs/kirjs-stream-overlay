import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from './modules/overlay/chat/chat.component';
import {WaitingScreenComponent} from './modules/waiting-screen/waiting-screen.component';
import {OverlayComponent} from './modules/overlay/overlay.component';

const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'overlay', component: OverlayComponent},
  {path: 'waiting', component: WaitingScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
