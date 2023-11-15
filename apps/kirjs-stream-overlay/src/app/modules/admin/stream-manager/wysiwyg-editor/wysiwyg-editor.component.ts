import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import MediumEditor from 'medium-editor';

@Component({
    selector: 'app-wysiwyg-editor',
    templateUrl: './wysiwyg-editor.component.html',
    styleUrls: ['./wysiwyg-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class WysiwygEditorComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() html!: string;
  @Output() changeHtml = new EventEmitter();
  private editor: any;
  code = '';

  constructor(private readonly el: ElementRef) {}

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.el.nativeElement, {
      toolbar: {
        buttons: ['bold', 'aside', 'unorderedlist', 'removeFormat'],
      },
    });
    this.editor.setContent(this.html);
    this.editor.subscribe('editableInput', (_: any, element: HTMLElement) => {
      this.code = element.innerHTML;
      this.changeHtml.emit(element.innerHTML);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editor) {
      if (this.code !== this.html) {
        this.editor.setContent(this.html);
      }
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
