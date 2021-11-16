import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { UniversalModule } from '@ng-web-apis/universal';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, UniversalModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
