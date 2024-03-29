import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';
import { AdminWrapperComponent } from './admin-wrapper.component';

@NgModule({
  declarations: [AdminWrapperComponent],
  imports: [CommonModule, RouterModule, LoginModule],
})
export class AdminWrapperModule {}
