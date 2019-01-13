import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-fragment',
  templateUrl: './text-fragment.component.html',
  styleUrls: ['./text-fragment.component.css']
})
export class TextFragmentComponent implements OnInit {

  @Input() conteudo: string;

  constructor() { }

  ngOnInit() {
  }

}
