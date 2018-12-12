import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  public content: string;

  @ViewChild('divContent') divContent: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Ao modificar o conteúdo
   * @param event Recebe o evento nativo
   */
  public contentChange( event: any ) {
    // this.content = this.divContent.nativeElement.innerText;

    const lines = this._processLines(this.divContent.nativeElement.innerText);

    console.log(lines);
  }

  /**
   * Processa cada uma das linhas de conteúdo
   * Atualizando elementos versionáveis já existentes ou criando novos
   */
  private _processLines(content: string): Array<any> {
    const lines = content.split('\n');

    return lines;
  }
}
