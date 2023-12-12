import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreamCompleteComponent } from './stream-complete.component';

describe('WaitingScreenComponent', () => {
  let component: StreamCompleteComponent;
  let fixture: ComponentFixture<StreamCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StreamCompleteComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
