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
    content = content.trim();
    let lines = content.split('\n');

    lines = this._trimDoubleSpacesAndMultipleEmptyNewLines(lines);

    return lines;
  }

  /**
   * Remove espaços duplos e quebra de linha dupla e vazia
   */
  private _trimDoubleSpacesAndMultipleEmptyNewLines( lines: Array<string> ): Array<string> {
    let beforeEmpty: Boolean = false;

    lines.forEach((text, idx) => {
      lines[idx] = text.trim().replace(/\s+/g, ' ');

      if (text.length === 0 && (beforeEmpty || !lines[idx - 1])) {
        delete lines[idx];
        beforeEmpty = false;
      } else {
        beforeEmpty = text.length === 0;
      }
    });

    lines =[...lines];

    return lines;
  }
}
