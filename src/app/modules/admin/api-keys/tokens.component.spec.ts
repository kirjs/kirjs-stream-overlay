import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokensComponent } from './tokens.component';

describe('ApiKeysComponent', () => {
  let component: TokensComponent;
  let fixture: ComponentFixture<TokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokensComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
