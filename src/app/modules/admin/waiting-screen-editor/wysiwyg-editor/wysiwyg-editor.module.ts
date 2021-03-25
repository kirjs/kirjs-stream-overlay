import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WysiwygEditorComponent } from './wysiwyg-editor.component';

@NgModule({
  declarations: [WysiwygEditorComponent],
  exports: [WysiwygEditorComponent],
  imports: [CommonModule],
})
export class WysiwygEditorModule {}
