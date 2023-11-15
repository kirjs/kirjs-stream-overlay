import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-admin-wrapper',
    templateUrl: './admin-wrapper.component.html',
    styleUrls: ['./admin-wrapper.component.scss'],
    standalone: true,
    imports: [LoginComponent, RouterOutlet],
})
export class AdminWrapperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
