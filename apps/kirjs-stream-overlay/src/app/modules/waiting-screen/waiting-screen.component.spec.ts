import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitingScreenComponent } from './waiting-screen.component';

describe('WaitingScreenComponent', () => {
  let component: WaitingScreenComponent;
  let fixture: ComponentFixture<WaitingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [WaitingScreenComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
