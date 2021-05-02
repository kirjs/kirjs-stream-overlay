import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatModule} from './modules/overlay/chat/chat.module';
import {BarModule} from './modules/overlay/bar/bar.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayModule} from './modules/overlay/overlay.module';
import {RouterModule} from '@angular/router';
import {AdminModule} from './modules/admin/admin.module';
import {StreamConfigService} from './modules/admin/waiting-screen-editor/stream-config.service';
import {StreamCompleteModule} from './modules/stream-complete/stream-complete.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HttpClientModule} from '@angular/common/http';
import {ApiKeysModule} from './modules/admin/api-keys/api-keys.module';
import {HomeModule} from './modules/home/home.module';
import {registerLocaleData} from '@angular/common';

import ru from '@angular/common/locales/ru';

registerLocaleData(ru, 'ru');

const firebaseConfig = {
  apiKey: 'AIzaSyChMYMZHe1xhmWXHyK-g0UJ-ZYVjc2AnYY',
  authDomain: 'kirjs-stream-overlay.firebaseapp.com',
  projectId: 'kirjs-stream-overlay',
  storageBucket: 'kirjs-stream-overlay.appspot.com',
  messagingSenderId: '703581438271',
  appId: '1:703581438271:web:b0a3b0a4e621115453d38a',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    AdminModule,
    ChatModule,
    OverlayModule,
    StreamCompleteModule,
    BarModule,
    ApiKeysModule,
    HomeModule,
  ],
  providers: [StreamConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
