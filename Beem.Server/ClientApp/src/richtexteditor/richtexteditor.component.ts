import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'richtexteditor',
  templateUrl: './richtexteditor.component.html',
  styleUrls: ['./richtexteditor.component.css']
})
export class RichTextEditorComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  quillConfiguration = QuillConfiguration;
  constructor() { }

  ngOnInit() {
  }

}

export const QuillConfiguration = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
}