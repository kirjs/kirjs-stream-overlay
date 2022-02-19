import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchLoginComponent } from './twitch-login.component';

describe('TwitchLoginComponent', () => {
  let component: TwitchLoginComponent;
  let fixture: ComponentFixture<TwitchLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
