import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamConfigComponent } from './stream-config.component';

describe('StreamConfigComponent', () => {
  let component: StreamConfigComponent;
  let fixture: ComponentFixture<StreamConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
