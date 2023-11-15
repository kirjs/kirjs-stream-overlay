import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WysiwygEditorComponent } from './wysiwyg-editor.component';

@NgModule({
    exports: [WysiwygEditorComponent],
    imports: [CommonModule, WysiwygEditorComponent],
})
export class WysiwygEditorModule {}
