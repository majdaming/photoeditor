import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '../editor/editor.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  declarations: [EditorComponent],
  exports: [EditorComponent]
})
export class PhotoEditorModule { }
