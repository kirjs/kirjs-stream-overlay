import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChatModule} from './modules/overlay/chat/chat.module';
import {BarModule} from './modules/overlay/bar/bar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayModule} from "./modules/overlay/overlay.module";
import {RouterModule} from "@angular/router";

const firebaseConfig = {
  apiKey: 'AIzaSyC_Zyq9Ve1SrbenuN0iDlDd4hQvTIlruP8',
  authDomain: 'kirjs-c884f.firebaseapp.com',
  databaseURL: 'https://kirjs-c884f.firebaseio.com',
  projectId: 'kirjs-c884f',
  storageBucket: 'kirjs-c884f.appspot.com',
  messagingSenderId: '651206687896',
  appId: '1:651206687896:web:3df45fa9e636bb5882a4ed',
  measurementId: 'G-3B7YEC4QG7'
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
    ChatModule,
    OverlayModule,
    BarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
