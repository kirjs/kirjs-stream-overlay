import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WysiwygEditorComponent } from './wysiwyg-editor.component';

@NgModule({
  declarations: [WysiwygEditorComponent],
  exports: [WysiwygEditorComponent],
  imports: [CommonModule],
})
export class WysiwygEditorModule {}
