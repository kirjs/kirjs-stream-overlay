import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ru from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TuiNotificationsModule, TuiRootModule } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { ApiKeysModule } from './modules/admin/api-keys/api-keys.module';
import { StreamConfigService } from './modules/admin/stream-manager/stream-config.service';
import { HomeModule } from './modules/home/home.module';
import { BarModule } from './modules/overlay/bar/bar.module';
import { ChatModule } from './modules/overlay/chat/chat.module';
import { OverlayModule } from './modules/overlay/overlay.module';
import { StreamCompleteModule } from './modules/stream-complete/stream-complete.module';

registerLocaleData(ru, 'ru');

const firebaseConfig = {
  // apiKey: 'AIzaSyC1RAwdiF-nGT9XB196Gf6AQHe96svMMuM',
  // authDomain: 'test-overlay-project.firebaseapp.com',
  // projectId: 'test-overlay-project',
  // storageBucket: 'test-overlay-project.appspot.com',
  // messagingSenderId: '977379365119',
  // appId: '1:977379365119:web:8569503929ee6bdb4ffcca'
  apiKey: 'AIzaSyBlPch6QtFOtK46NSc-P6pbuiHe2iAp5K4',
  authDomain: 'kirjs-stream-overlay.firebaseapp.com',
  projectId: 'kirjs-stream-overlay',
  storageBucket: 'kirjs-stream-overlay.appspot.com',
  messagingSenderId: '703581438271',
  appId: '1:703581438271:web:b0a3b0a4e621115453d38a',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    TuiRootModule,
    TuiNotificationsModule,
    provideFunctions(() => getFunctions()),
  ],
  providers: [StreamConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
