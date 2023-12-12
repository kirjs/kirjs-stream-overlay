import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YoutubePreviewComponent } from './youtube-preview.component';

describe('YoutubePreviewComponent', () => {
  let component: YoutubePreviewComponent;
  let fixture: ComponentFixture<YoutubePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubePreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
