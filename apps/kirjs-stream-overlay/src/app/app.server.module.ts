import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { UniversalModule } from '@ng-web-apis/universal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, UniversalModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
