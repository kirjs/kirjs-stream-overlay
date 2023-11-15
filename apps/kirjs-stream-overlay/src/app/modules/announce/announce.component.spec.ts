import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnounceComponent } from './announce.component';

describe('AnnounceComponent', () => {
  let component: AnnounceComponent;
  let fixture: ComponentFixture<AnnounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AnnounceComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
