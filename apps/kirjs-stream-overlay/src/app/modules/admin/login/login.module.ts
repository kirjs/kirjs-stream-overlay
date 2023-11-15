import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
    exports: [LoginComponent],
    imports: [CommonModule, RouterModule, MatButtonModule, LoginComponent],
})
export class LoginModule {}
