import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-editor-fragment',
  templateUrl: './text-editor-fragment.component.html',
  styleUrls: ['./text-editor-fragment.component.css']
})
export class TextEditorFragmentComponent implements OnInit {

  @Input() conteudo: string;

  constructor() { }

  ngOnInit() {
  }

}
