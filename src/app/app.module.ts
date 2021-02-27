import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChatModule} from './modules/overlay/chat/chat.module';
import {BarModule} from './modules/overlay/bar/bar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayModule} from './modules/overlay/overlay.module';
import {RouterModule} from '@angular/router';
import {AdminModule} from './modules/admin/admin.module';
import {WaitingService} from './modules/admin/waiting-screen-editor/waiting.service';

const firebaseConfig = {
  apiKey: 'AIzaSyChMYMZHe1xhmWXHyK-g0UJ-ZYVjc2AnYY',
  authDomain: 'kirjs-stream-overlay.firebaseapp.com',
  projectId: 'kirjs-stream-overlay',
  storageBucket: 'kirjs-stream-overlay.appspot.com',
  messagingSenderId: '703581438271',
  appId: '1:703581438271:web:b0a3b0a4e621115453d38a'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(
      firebaseConfig
    ),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AdminModule,
    ChatModule,
    OverlayModule,
    BarModule
  ],
  providers: [WaitingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
