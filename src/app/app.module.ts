import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChatModule} from './modules/chat/chat.module';
import {BarModule} from './modules/bar/bar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ChatModule,
    BarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
