import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreamManagerComponent } from './stream-manager.component';

describe('WaitingScreenEditorComponent', () => {
  let component: StreamManagerComponent;
  let fixture: ComponentFixture<StreamManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StreamManagerComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
