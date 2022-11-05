import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RichTextEditorComponent } from './richtexteditor.component'
import { QuillModule } from 'ngx-quill'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [RichTextEditorComponent],
  exports: [RichTextEditorComponent],
})
export class RichTextEditorModule {}