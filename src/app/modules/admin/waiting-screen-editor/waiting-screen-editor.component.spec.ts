import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingScreenEditorComponent } from './waiting-screen-editor.component';

describe('WaitingScreenEditorComponent', () => {
  let component: WaitingScreenEditorComponent;
  let fixture: ComponentFixture<WaitingScreenEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingScreenEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingScreenEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
